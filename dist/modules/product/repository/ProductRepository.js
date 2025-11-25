"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProductRepository {
    create(data) {
        return prisma.product.create({ data: {
                title: data.title,
                description: data.description,
                stock: data.stock,
                price: data.price,
                images: data.images,
                categories: {
                    connect: data.categoryIds.map(id => ({ id }))
                },
            },
            include: {
                categories: true
            },
        });
    }
    async findAll() {
        return prisma.product.findMany({ include: {
                categories: true
            } });
    }
    findById(id) {
        return prisma.product.findUnique({ where: { id },
            include: {
                categories: true
            } });
    }
}
exports.ProductRepository = ProductRepository;

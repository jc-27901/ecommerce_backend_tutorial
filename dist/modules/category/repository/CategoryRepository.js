"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CategoryRepository {
    create(name) {
        return prisma.category.create({ data: { name } });
    }
    findAll() {
        return prisma.category.findMany();
    }
    findById(id) {
        return prisma.category.findUnique({ where: { id } });
    }
}
exports.CategoryRepository = CategoryRepository;

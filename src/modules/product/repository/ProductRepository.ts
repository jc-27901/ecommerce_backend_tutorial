import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductRepository {
  create(data: {
    title: string;
    description: string;
    stock: number;
    price: number;
    categoryIds: string[];
  }) {
    return prisma.product.create({ data: {
        title: data.title,
        description: data.description,
        stock: data.stock,
        price: data.price,
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
    return prisma.product.findMany({include: {
            categories: true
        }});
  }

  findById(id: string) {
    return prisma.product.findUnique({ where: { id },
         include: {
            categories: true
        } });
  }
}
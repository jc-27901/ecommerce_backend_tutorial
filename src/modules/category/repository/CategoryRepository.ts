import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryRepository {
  create(name: string) {
    return prisma.category.create({ data: { name } });
  }

  findAll() {
    return prisma.category.findMany();
  }

  findById(id: string) {
    return prisma.category.findUnique({ where: { id } });
  }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const ProductRepository_1 = require("../repository/ProductRepository");
const CategoryRepository_1 = require("../../category/repository/CategoryRepository");
class ProductService {
    constructor() {
        this.productRepo = new ProductRepository_1.ProductRepository();
        this.categoryRepo = new CategoryRepository_1.CategoryRepository();
    }
    async createProduct(title, description, stock, price, categoryIds, imageUrls) {
        for (const id of categoryIds) {
            const catId = await this.categoryRepo.findById(id);
            if (!catId) {
                throw new Error(`Category not found: ${id}`);
            }
        }
        return this.productRepo.create({
            title,
            description,
            stock,
            price,
            categoryIds,
            images: imageUrls,
        });
    }
    async getProducts() {
        return await this.productRepo.findAll();
    }
}
exports.ProductService = ProductService;

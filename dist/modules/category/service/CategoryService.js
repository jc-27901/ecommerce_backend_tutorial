"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const CategoryRepository_1 = require("../repository/CategoryRepository");
class CategoryService {
    constructor() {
        this.repository = new CategoryRepository_1.CategoryRepository();
    }
    createCategory(name) {
        return this.repository.create(name);
    }
    getCategories() {
        return this.repository.findAll();
    }
}
exports.CategoryService = CategoryService;

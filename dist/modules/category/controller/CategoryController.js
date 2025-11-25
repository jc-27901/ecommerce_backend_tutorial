"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const CategoryService_1 = require("../service/CategoryService");
const categoryService = new CategoryService_1.CategoryService();
class CategoryController {
    async createCategory(req, res) {
        try {
            const { name } = req.body;
            const category = await categoryService.createCategory(name);
            return res.status(201).json({ category });
        }
        catch (error) {
            res.status(400).json({ error: 'Category already exists' });
        }
    }
    async listCategories(req, res) {
        try {
            const categories = await categoryService.getCategories();
            return res.status(200).json(categories);
        }
        catch (error) {
            res.status(400).json({ error: 'Error listing categories' });
        }
    }
}
exports.CategoryController = CategoryController;

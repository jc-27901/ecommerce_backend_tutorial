"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductService_1 = require("../service/ProductService");
const productService = new ProductService_1.ProductService();
class ProductController {
    async createProduct(req, res) {
        try {
            const { title, description, stock, price, categoryIds } = req.body;
            let parsedCategories;
            try {
                parsedCategories = typeof categoryIds === "string"
                    ? JSON.parse(categoryIds)
                    : categoryIds;
            }
            catch (error) {
                console.log("ERROR IN PRODUCT CREATE:", error);
                return res.status(400).json({ error: "Invalid categoryIds format" });
            }
            const imageUrls = req.files.map((file) => file.path);
            const product = await productService.createProduct(title, description, Number(stock), Number(price), parsedCategories, imageUrls);
            return res.status(201).json(product);
        }
        catch (error) {
            console.log("ERROR IN PRODUCT CREATE:", error);
            return res.status(400).json({ error: error.message });
        }
    }
    async getProducts(req, res) {
        try {
            const products = await productService.getProducts();
            return res.status(200).json(products);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.ProductController = ProductController;

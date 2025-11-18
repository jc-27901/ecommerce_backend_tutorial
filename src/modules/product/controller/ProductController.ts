import { ProductService } from "../service/ProductService";
import { Request, Response } from "express";

const productService = new ProductService();

export class ProductController {

    async createProduct(req: Request, res: Response) {
  try { 
    const { title, description, stock, price, categoryIds } = req.body;
    const product = await productService.createProduct(
      title,
      description,
      stock,
      price,
      categoryIds,
    );
    res.status(201).json(product);
  } catch (error : any) {
    res.status(400).json({ error: error.message });
  }
}

  async getProducts(req: Request, res: Response) {
    try {
      const products = await productService.getProducts();
      res.status(200).json(products);
    } catch (error : any) {
      res.status(400).json({ error: error.message });
    }
  }
}


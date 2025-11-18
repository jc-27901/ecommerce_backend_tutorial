import { ProductService } from "../service/ProductService";
import { Request, Response } from "express";

const productService = new ProductService();

export class ProductController {

    async createProduct(req: Request, res: Response) {
  try { 
    const { title, description, stock, price, categoryIds } = req.body;
    const imageUrls = (req.files as Express.Multer.File[]).map(
      (file) => file.path
    );

    const product = await productService.createProduct(
      title,
      description,
      Number(stock),
      Number(price),
      JSON.parse(categoryIds),
      imageUrls,
    );
    return res.status(201).json(product);
  } catch (error : any) {
    return res.status(400).json({ error: error.message });
  }
}

  async getProducts(req: Request, res: Response) {
    try {
      const products = await productService.getProducts();
      return res.status(200).json(products);
    } catch (error : any) {
      return res.status(400).json({ error: error.message });
    }
  }
}


import { CategoryService } from "../service/CategoryService";
import { Request, Response } from "express";

const categoryService = new CategoryService();

export class CategoryController {
  async createCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const category = await categoryService.createCategory(name);
      return res.status(201).json({category});
    } catch (error: any) {
      res.status(400).json({ error: 'Category already exists' });
    }
  }

  async listCategories(req: Request, res: Response) {
    try {
        const categories = await categoryService.getCategories();
        return res.status(200).json(categories);
    } catch (error: any) {
        res.status(400).json({ error: 'Error listing categories' });
    }

  }
}
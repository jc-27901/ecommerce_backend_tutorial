import { ProductRepository } from "../repository/ProductRepository";
import { CategoryRepository } from "../../category/repository/CategoryRepository";
export class ProductService {
  private productRepo = new ProductRepository();
  private categoryRepo = new CategoryRepository();

  async createProduct(
    title: string,
    description: string,
    stock: number,
    price: number,
    categoryIds: string[],
    imageUrls: string[],
  ) {

    for(const id of categoryIds) {
     const catId = await this.categoryRepo.findById(id);
     if(!catId) {
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
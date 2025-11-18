import { CategoryRepository } from "../repository/CategoryRepository";

export class CategoryService {
  private repository = new CategoryRepository();

  createCategory(name: string) {
    return this.repository.create(name);
  }

  getCategories() {
    return this.repository.findAll();
  }
}

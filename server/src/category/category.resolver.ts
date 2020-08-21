import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category, CreateCategoryInput, UpdateCategoryInput } from '../graphql';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query('categories')
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Query('category')
  async getCategory(@Args('id') id): Promise<Category> {
    return await this.categoryService.findOne(id);
  }

  @Mutation('createCategory')
  async createCategory(@Args('input') input: CreateCategoryInput) {
    return await this.categoryService.create(input);
  }

  @Mutation('updateCategory')
  async updateCategory(@Args('input') input: UpdateCategoryInput) {
    return await this.categoryService.update(input);
  }

  @Mutation('deleteCategory')
  async deleteAccount(@Args('id') id: number) {
    return await this.categoryService.remove(id);
  }
}

import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryInput, UpdateCategoryInput } from '../graphql';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    return categories.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }

  async create(input: CreateCategoryInput): Promise<Category> {
    const existCategory = await this.categoryRepository.findOne({
      title: input.title,
    });
    if (existCategory) {
      throw new ConflictException('Category with same title already exist');
    }

    const category = new Category();
    category.title = input.title;
    category.icon = input.icon;

    await this.categoryRepository.save(category);
    return category;
  }

  async update(input: UpdateCategoryInput): Promise<Category> {
    const { id, ...categoryData } = input;
    const categoryToUpdate = await this.categoryRepository.findOne({ id });
    const updatedCategory = Object.assign(categoryToUpdate, categoryData);
    await this.categoryRepository.save(updatedCategory);
    return updatedCategory;
  }

  async remove(id: number): Promise<Category> {
    const existCategory = await this.categoryRepository.findOne(id);
    if (!existCategory) {
      throw new HttpException(
        "Category with provided id doesn't exist",
        HttpStatus.CONFLICT,
      );
    }
    await this.categoryRepository.delete(id);
    return existCategory;
  }
}

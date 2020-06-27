import { Body, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }

  async create(@Body() categoryData: CreateCategoryDto): Promise<Category> {
    const existCategory = await this.categoryRepository.findOne({
      title: categoryData.title,
    });
    if (existCategory) {
      throw new ConflictException('Category with same title already exist');
    }

    const category = new Category();
    category.title = categoryData.title;

    await this.categoryRepository.save(category);
    return category;
  }

  async update(id: number, @Body() categoryData: UpdateCategoryDto): Promise<Category> {
    const categoryToUpdate = await this.categoryRepository.findOne({ id });
    const updatedCategory = Object.assign(categoryToUpdate, categoryData);
    await this.categoryRepository.save(updatedCategory);
    return updatedCategory;
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}

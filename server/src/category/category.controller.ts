import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtStrategy } from '../auth/jwt.strategy';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseGuards(JwtStrategy)
@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ description: 'Return all categories' })
  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Get category' })
  @ApiOkResponse({ description: 'Return category' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async findOne(@Param('id') id) {
    return this.categoryService.findOne(id);
  }

  @ApiOperation({ summary: 'Create category' })
  @ApiCreatedResponse({ description: 'The category has been created ' })
  @Post()
  async create(@Body() categoryData: CreateCategoryDto) {
    return this.categoryService.create(categoryData);
  }

  @ApiOperation({ summary: 'Update category' })
  @ApiCreatedResponse({ description: 'The category has been updated' })
  @ApiParam({ name: 'id', type: Number })
  @Put(':id')
  async update(@Param('id') id, @Body() categoryData: UpdateCategoryDto) {
    return this.categoryService.update(id, categoryData);
  }

  @ApiOperation({ summary: 'Delete category' })
  @ApiCreatedResponse({ description: 'The category has been deleted' })
  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async remove(@Param('id') id) {
    return this.categoryService.remove(id);
  }
}

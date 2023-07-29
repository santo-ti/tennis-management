import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity.ts';
import { ParseObjectIdPipe } from 'src/validations/parse-objectid.pipe';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Post()
  async create(@Body() categoryDto: CreateCategoryDto): Promise<void> {
    await this.service.create(categoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.service.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<Category> {
    return await this.service.findOne(id);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() categoryDto: UpdateCategoryDto,
  ): Promise<void> {
    await this.service.update(id, categoryDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this.service.delete(id);
  }

  @Patch('/:categoryId/players/:playerId')
  async addPlayer(
    @Param('categoryId', ParseObjectIdPipe) categoryId: string,
    @Param('playerId', ParseObjectIdPipe) playerId: string,
  ): Promise<void> {
    await this.service.addPlayer(categoryId, playerId);
  }
}

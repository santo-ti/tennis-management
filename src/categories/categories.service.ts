import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity.ts';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { PlayersService } from 'src/players/players.service.js';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  @InjectModel(Category.name) private readonly model: Model<Category>;

  private readonly playersService: PlayersService;

  async create(category: CreateCategoryDto): Promise<void> {
    this.logger.log(`create dto: ${JSON.stringify(category)}`);
    await this.model.create(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.model.find().populate('players').exec();
  }

  async findOne(id: string): Promise<Category> {
    this.logger.log(`find id: ${id}`);
    return await this.model.findById(id).populate('players').exec();
  }

  async update(id: string, category: UpdateCategoryDto): Promise<void> {
    this.logger.log(`update dto: ${JSON.stringify(category)}`);
    await this.model.findByIdAndUpdate(id, category, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`remove id: ${id}`);
    await this.model.findByIdAndRemove(id).exec();
  }

  async addPlayer(categoryId: string, playerId: any): Promise<void> {
    this.logger.log(`addPlayer categoryId: ${categoryId}`);
    this.logger.log(`addPlayer playerId: ${playerId}`);

    const categoryFound = await this.model.findById(categoryId).exec();
    if (!categoryFound) {
      throw new BadRequestException('Category not found');
    }

    const playerFound = await this.playersService.findOne(playerId);
    if (!playerFound) {
      throw new BadRequestException('Player not found');
    }

    const playerInCategory = await this.model
      .findOne()
      .where('players')
      .in(playerId)
      .exec();
    if (playerInCategory) {
      throw new BadRequestException('Player already registered');
    }

    categoryFound.players.push(playerId);

    await this.model
      .findByIdAndUpdate(categoryId, categoryFound, {
        new: true,
      })
      .exec();
  }
}

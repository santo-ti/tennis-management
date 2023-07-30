import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { PlayersService } from '../players/players.service';
import { Player } from '../players/entities/player.entity';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let categoriesService: CategoriesService;
  let mockCategoryModel: Model<Category>;
  let playersService: PlayersService;
  let mockPlayerModel: Model<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        { provide: getModelToken(Category.name), useValue: mockCategoryModel },
        PlayersService,
        { provide: getModelToken(Player.name), useValue: mockPlayerModel },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    categoriesService = module.get<CategoriesService>(CategoriesService);
    playersService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined with controller', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined with CategoriesService', () => {
    expect(categoriesService).toBeDefined();
  });

  it('should be defined with PlayersService', () => {
    expect(playersService).toBeDefined();
  });
});

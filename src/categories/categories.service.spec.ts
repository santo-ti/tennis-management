import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { PlayersService } from '../players/players.service';
import { Player } from '../players/entities/player.entity';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let mockCategoryModel: Model<Category>;
  let playersService: PlayersService;
  let mockPlayerModel: Model<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: getModelToken(Category.name), useValue: mockCategoryModel },
        PlayersService,
        { provide: getModelToken(Player.name), useValue: mockPlayerModel },
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
    playersService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined with CategoriesService', () => {
    expect(categoriesService).toBeDefined();
  });

  it('should be defined with PlayersService', () => {
    expect(playersService).toBeDefined();
  });
});

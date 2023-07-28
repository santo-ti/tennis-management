import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { Player } from './entities/player.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('PlayersController', () => {
  let controller: PlayersController;
  let mockModel: Model<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        PlayersService,
        { provide: getModelToken(Player.name), useValue: mockModel },
      ],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { getModelToken } from '@nestjs/mongoose';
import { Player } from './entities/player.entity';
import { Model } from 'mongoose';

describe('PlayersService', () => {
  let service: PlayersService;
  let mockModel: Model<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        { provide: getModelToken(Player.name), useValue: mockModel },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

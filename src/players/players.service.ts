import {
  BadRequestException,
  NotFoundException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create.player.dto';
import { Player } from './entities/player.entity';
import { UpdatePlayerDto } from './dtos/update.player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    this.logger.log(`create dto: ${JSON.stringify(createPlayerDto)}`);
    const result = new this.playerModel(createPlayerDto);
    return await result.save();
  }

  async update(updatePlayerDto: UpdatePlayerDto): Promise<void> {
    this.logger.log(`update dto: ${JSON.stringify(updatePlayerDto)}`);
    const { id } = updatePlayerDto;

    const playerFound = await this.playerModel
      .findByIdAndUpdate(id, { ...updatePlayerDto })
      .exec();

    if (!playerFound) {
      throw new NotFoundException('The player not found');
    }
  }

  async findAll(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async findOne(playerId: string): Promise<Player> {
    this.logger.log(`find playerId: ${playerId}`);

    const playerFound = await this.playerModel.findById(playerId).exec();

    if (!playerFound) {
      throw new NotFoundException('The player not found');
    }

    return playerFound;
  }

  async remove(playerId: string): Promise<Player> {
    this.logger.log(`remove playerId: ${playerId}`);

    const playerFound = await this.playerModel.findById(playerId).exec();

    if (!playerFound) {
      throw new NotFoundException('The player not found');
    }

    return await this.playerModel.findByIdAndRemove(playerId).exec();
  }
}

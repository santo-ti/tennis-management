import {
  NotFoundException,
  InternalServerErrorException,
  Injectable,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create.player.dto';
import { Player } from './entities/player.entity';
import { UpdatePlayerDto } from './dtos/update.player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    this.logger.log(`create dto: ${JSON.stringify(createPlayerDto)}`);

    const { email, cellPhone } = createPlayerDto;

    await this.verifyCreateExists(email, cellPhone);

    const result = new this.playerModel(createPlayerDto);
    return await result.save();
  }

  async update(
    playerId: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<void> {
    this.logger.log(`update dto: ${JSON.stringify(updatePlayerDto)}`);

    const { email, cellPhone } = updatePlayerDto;

    // await this.verifyUpdateExists(email, cellPhone, playerId);

    const playerFound = await this.playerModel
      .findByIdAndUpdate(playerId, { ...updatePlayerDto })
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

  async remove(playerId: string): Promise<void> {
    this.logger.log(`remove playerId: ${playerId}`);

    const playerFound = await this.playerModel.findById(playerId).exec();

    if (!playerFound) {
      throw new NotFoundException('The player not found');
    }

    const result = await this.playerModel.deleteOne({ _id: playerId }).exec();

    if (!result || !result.acknowledged) {
      throw new InternalServerErrorException('Error deleting player');
    }
  }

  private async verifyCreateExists(email: string, cellPhone: string) {
    const playerEmailFound = await this.playerModel.findOne({ email }).exec();

    if (playerEmailFound) {
      throw new BadRequestException('The email is already exists');
    }

    const playerCellPhoneFound = await this.playerModel
      .findOne({ cellPhone })
      .exec();

    if (playerCellPhoneFound) {
      throw new BadRequestException('The phone is already exists');
    }
  }

  private async verifyUpdateExists(
    email: string,
    cellPhone: string,
    playerId: string,
  ) {
    const playerFound = await this.playerModel.findById(playerId).exec();

    if (!playerFound) {
      throw new NotFoundException('The player not found');
    }

    if (playerFound.email !== email) {
      const playerEmailFound = await this.playerModel.findOne({ email }).exec();

      if (playerEmailFound) {
        throw new BadRequestException('The email is already exists');
      }
    }

    if (playerFound.cellPhone !== cellPhone) {
      const playerCellPhoneFound = await this.playerModel
        .findOne({ cellPhone })
        .exec();

      if (playerCellPhoneFound) {
        throw new BadRequestException('The phone is already exists');
      }
    }
  }
}

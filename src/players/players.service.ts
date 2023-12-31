import {
  NotFoundException,
  InternalServerErrorException,
  Injectable,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { CreatePlayerDto, UpdatePlayerDto } from './dtos';
import { Player } from './entities/player.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel(Player.name) private readonly model: Model<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`create dto: ${JSON.stringify(createPlayerDto)}`);

    const { email, cellPhone } = createPlayerDto;

    await this.verifyCreateExists(email, cellPhone);

    const result = new this.model(createPlayerDto);
    await result.save();
  }

  async update(
    playerId: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<void> {
    this.logger.log(`update dto: ${JSON.stringify(updatePlayerDto)}`);

    const { email, cellPhone } = updatePlayerDto;

    await this.verifyUpdateExists(email, cellPhone, playerId);

    const playerFound = await this.model
      .findByIdAndUpdate(playerId, updatePlayerDto, { new: true })
      .exec();

    if (!playerFound) {
      throw new NotFoundException('The player not found');
    }
  }

  async findAll(): Promise<Player[]> {
    return await this.model.find().exec();
  }

  async findOne(playerId: string): Promise<Player> {
    this.logger.log(`find playerId: ${playerId}`);

    const playerFound = await this.model.findById(playerId).exec();

    if (!playerFound) {
      throw new NotFoundException('The player not found');
    }

    return playerFound;
  }

  async remove(playerId: string): Promise<void> {
    this.logger.log(`remove playerId: ${playerId}`);

    const playerFound = await this.model.findById(playerId).exec();

    if (!playerFound) {
      throw new NotFoundException('The player not found');
    }

    const result = await this.model.deleteOne({ _id: playerId }).exec();

    if (!result || !result.acknowledged) {
      throw new InternalServerErrorException('Error deleting player');
    }
  }

  private async verifyCreateExists(email: string, cellPhone: string) {
    const playerEmailFound = await this.model.findOne({ email }).exec();

    if (playerEmailFound) {
      throw new BadRequestException('The email is already exists');
    }

    const playerCellPhoneFound = await this.model.findOne({ cellPhone }).exec();

    if (playerCellPhoneFound) {
      throw new BadRequestException('The phone is already exists');
    }
  }

  private async verifyUpdateExists(
    email: string,
    cellPhone: string,
    playerId: string,
  ) {
    const playerFound = await this.model.findById(playerId).exec();

    if (!playerFound) {
      throw new NotFoundException('The player not found');
    }

    if (playerFound.email !== email) {
      const playerEmailFound = await this.model.findOne({ email }).exec();

      if (playerEmailFound) {
        throw new BadRequestException('The email is already exists');
      }
    }

    if (playerFound.cellPhone !== cellPhone) {
      const playerCellPhoneFound = await this.model
        .findOne({ cellPhone })
        .exec();

      if (playerCellPhoneFound) {
        throw new BadRequestException('The phone is already exists');
      }
    }
  }
}

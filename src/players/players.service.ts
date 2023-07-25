import {
  BadRequestException,
  NotFoundException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create.player.dto';
import { Player } from './entities/player.entity';
import { v4 as uuidV4, validate as uuidValidate } from 'uuid';
import { UpdatePlayerDto } from './dtos/update.player.dto';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  private players: Player[] = [];

  async create(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`create dto: ${JSON.stringify(createPlayerDto)}`);
    const { name, cellPhone, email } = createPlayerDto;

    const player: Player = {
      id: uuidV4(),
      name,
      cellPhone,
      email,
    };
    this.players.push(player);
  }

  async update(updatePlayerDto: UpdatePlayerDto): Promise<void> {
    this.logger.log(`update dto: ${JSON.stringify(updatePlayerDto)}`);
    const { id, cellPhone, email, name, ranking, rankingPosition, urlPhoto } =
      updatePlayerDto;

    if (!uuidValidate(id)) {
      throw new BadRequestException('The value passed as UUID is not valid');
    }

    const playerFound = this.players.find((player) => player.id === id);

    if (!playerFound) {
      throw new NotFoundException('The player not found');
    }

    playerFound.cellPhone = cellPhone;
    playerFound.email = email;
    playerFound.name = name;
    playerFound.ranking = ranking;
    playerFound.rankingPosition = rankingPosition;
    playerFound.urlPhoto = urlPhoto;
  }

  async findAll(): Promise<Player[]> {
    return this.players;
  }

  async findOne(playerId: string): Promise<Player> {
    this.logger.log(`find playerId: ${playerId}`);

    if (!uuidValidate(playerId)) {
      throw new BadRequestException('The value passed as UUID is not valid');
    }

    const playerFound = this.players.find((player) => player.id === playerId);

    if (!playerFound) {
      throw new NotFoundException('The player not found');
    }

    return playerFound;
  }

  async remove(playerId: string): Promise<void> {
    this.logger.log(`remove playerId: ${playerId}`);

    if (!uuidValidate(playerId)) {
      throw new BadRequestException('The value passed as UUID is not valid');
    }

    const playerIndex = this.players.findIndex(
      (player) => player.id === playerId,
    );

    if (playerIndex === -1) {
      throw new NotFoundException('The player not found');
    }

    this.players.splice(playerIndex, 1);
  }
}

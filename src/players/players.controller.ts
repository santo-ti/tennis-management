import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePlayerDto, UpdatePlayerDto } from './dtos';
import { PlayersService } from './players.service';
import { Player } from './entities/player.entity';
import { ParseObjectIdPipe } from '../validations/parse-objectid.pipe';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly service: PlayersService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<void> {
    await this.service.create(createPlayerDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseObjectIdPipe) playerId: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<void> {
    await this.service.update(playerId, updatePlayerDto);
  }

  @Get()
  async findALl(): Promise<Player[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) playerId: string,
  ): Promise<Player> {
    return await this.service.findOne(playerId);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseObjectIdPipe) playerId: string,
  ): Promise<void> {
    await this.service.remove(playerId);
  }
}

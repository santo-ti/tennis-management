import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create.player.dto';
import { PlayersService } from './players.service';
import { UpdatePlayerDto } from './dtos/update.player.dto';
import { Player } from './entities/player.entity';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<void> {
    await this.playersService.create(createPlayerDto);
  }

  @Put()
  async updatePlayer(@Body() updatePlayerDto: UpdatePlayerDto): Promise<void> {
    await this.playersService.update(updatePlayerDto);
  }

  @Get()
  async findALl(): Promise<Player[]> {
    return await this.playersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') playerId: string): Promise<Player> {
    return await this.playersService.findOne(playerId);
  }

  @Delete(':id')
  async remove(@Param('id') playerId: string): Promise<void> {
    await this.playersService.remove(playerId);
  }
}

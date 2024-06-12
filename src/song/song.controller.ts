import { Controller, Get, Param, Query, Put, Post, Body, Delete, ValidationPipe, UsePipes, Patch } from '@nestjs/common';
import { SongService } from './song.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { SongDto } from './song.dto';
import { GetAll } from './getAll.dto';
import { PaginationDto } from 'src/pagination/pagination.dto';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) { }

  @Get()
  async getAllSongs(@Query() queryDto: GetAll) {
    return this.songService.getAllSongs(queryDto)
  }

  @Get('most-popular')
  async getMostPopularByListens(@Query() queryDto: PaginationDto) {
    return this.songService.getMostPopularByListens(queryDto)
  }

  @Get(':id')
  async getSong(@Param('id') id: string) {
    return this.songService.byId(+id)
  }

  @Get('song/profile')
  @Auth()
  async getPrivateSong(@CurrentUser('id') id: number) {
    return this.songService.byId(+id)
  }

  @Post('')
  @Auth()
  async createSong(@CurrentUser('id') id: number) {
    return this.songService.createSong(id)
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  @Auth()
  async updateSong(
    @Param('id') id: string,
    @Body() dto: SongDto
  ) {
    return this.songService.updateSong(+id, dto)
  }

  @Delete(':id')
  @Auth()
  async deleteSong(@Param('id') id: string) {
    return this.songService.deleteSong(+id)
  }

  @Put('update-listens/:songId')
  async updateListens(@Param('songId') songId: string) {
    return this.songService.updateCountListens(+songId)
  }

  @Put('update-likes/:songId')
  @Auth()
  async updateLikes(
    @CurrentUser('id') id: string,
    @Param('songId') songId: string
  ) {
    return this.songService.updateReaction(+id, +songId)
  }
}

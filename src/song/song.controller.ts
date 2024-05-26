import { Controller, Get, Param, Query, Put, Post, Body, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { SongService } from './song.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { SongDto } from './song.dto';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get()
  async getAllSongs(@Query('searchTerm') searchTerm?: string) {
      return this.songService.getAllSongs(searchTerm)
  }

  @Get('song/profile')
  @Auth()
  async getPrivateSong(@CurrentUser('id') id: number) {
      return this.songService.byId(+id)
  }  

  @Get('most-popular')  
  async getMostPopularByListens() {
      return this.songService.getMostPopularByListens()
  }

  @Get(':id')
  @Post()
  @Auth()
  async getSong(@Param('id') id: string){
    return this.songService.byId(+id)
  }

  @Post('')
  @Auth()
  async createSong(@CurrentUser('id') id: number) {
    return this.songService.createSong(id)
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
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
  @Auth()
  async updateListens(@Param('songId') songId: string) {
    return this.songService.updateCountListens(+songId)
  }

  @Put('update-likes/:songId')
  @Auth()
  async updateLikes(@Param('songId') songId: string) {
    return this.songService.updateReaction(+songId)
  }
}

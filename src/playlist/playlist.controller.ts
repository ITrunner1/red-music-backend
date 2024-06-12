import { Controller, Get, Param, Post, Put, Query, ValidationPipe, UsePipes, Delete, Body } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { PlaylistDto } from './playlist.dto';
import { SongDto } from 'src/song/song.dto';
import { GetAll } from 'src/song/getAll.dto';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) { }

  @Get()
  async getAllPlaylists(@Query() queryDto: GetAll) {
    return this.playlistService.getAllPlaylists(queryDto)
  }

  @Get('playlists/profile')
  @Auth()
  async getPrivatePlaylist(@CurrentUser('id') id: number) {
    return this.playlistService.getPlaylistById(+id)
  }

  @Get(':id')
  async getPlaylist(@Param('id') id: string) {
    return this.playlistService.getPlaylistById(+id)
  }

  @Post('')
  @Auth()
  async createPlaylist(@CurrentUser('id') id: number) {
    return this.playlistService.createPlaylist(id)
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Auth()
  async updatePlaylist(
    @Param('id') id: string,
    @Body() dto: PlaylistDto
  ) {
    return this.playlistService.updatePlaylist(+id, dto)
  }

  @Delete(':id')
  @Auth()
  async deletePlaylist(@Param('id') id: string) {
    return this.playlistService.deletePlaylist(+id)
  }

  @Put('update-listens/:playlistId')
  async updateListens(@Param('playlistId') playlistId: string) {
    return this.playlistService.updateCountListens(+playlistId)
  }

  @Put('update-likes/:playlistId')
  @Auth()
  async updateLikes(
    @CurrentUser('id') id: string,
    @Param('playlistId') playlistId: string
  ) {
    return this.playlistService.updateReaction(+id, +playlistId)
  }
}

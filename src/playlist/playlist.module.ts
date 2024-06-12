import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './playlist.entity';
import { LikePlaylistEntity } from './likePlaylist.entity';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  controllers: [PlaylistController],
  providers: [PlaylistService, PaginationService],
  imports: [TypeOrmModule.forFeature([PlaylistEntity, LikePlaylistEntity])]
})
export class PlaylistModule { }

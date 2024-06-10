import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './playlist.entity';
import { LikePlaylistEntity } from './likePlaylist.entity';

@Module({
  controllers: [PlaylistController],
  providers: [PlaylistService],
  imports: [TypeOrmModule.forFeature([PlaylistEntity, LikePlaylistEntity])]
})
export class PlaylistModule { }

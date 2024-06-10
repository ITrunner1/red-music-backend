import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { SongEntity } from './song.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeSongEntity } from './likeSong.entity';

@Module({
  controllers: [SongController],
  providers: [SongService],
  imports: [TypeOrmModule.forFeature([SongEntity, LikeSongEntity])]  
})
export class SongModule { }

import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { SongEntity } from './song.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeSongEntity } from './likeSong.entity';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  controllers: [SongController],
  providers: [SongService, PaginationService],
  imports: [TypeOrmModule.forFeature([SongEntity, LikeSongEntity])]  
})
export class SongModule { }

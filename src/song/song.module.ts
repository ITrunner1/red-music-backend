import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { SongEntity } from './song.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SongController],
  providers: [SongService],
  imports: [TypeOrmModule.forFeature([SongEntity])],
  exports: [SongService, TypeOrmModule.forFeature([SongEntity])]
})
export class SongModule { }

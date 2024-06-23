import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from './genre.entity';
import { SlugService } from 'nestjs-slug';

@Module({
  controllers: [GenreController],
  providers: [GenreService, SlugService],
  imports: [TypeOrmModule.forFeature([GenreEntity])]  
})
export class GenreModule {}

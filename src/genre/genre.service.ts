import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreEntity } from './genre.entity';
import { Repository } from 'typeorm';
import { IsString } from 'class-validator';
import { SlugService } from 'nestjs-slug';

export class GenreDto {
    @IsString()
    name: string
}

@Injectable()
export class GenreService {
    getAllGenres() {
      throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(GenreEntity)
        private readonly genreRepository: Repository<GenreEntity>,
        private slugService: SlugService,
    ) { }

    async byId(id: number) {
        const genre = await this.genreRepository.findOne({
            where: {
                id
            }
        })

        if (!genre) {
            throw new Error("Категория не найдена")
        }

        return genre
    }

    async bySlug(slug: string) {
        const genre = await this.genreRepository.findOne({
            where: {
                slug
            }
        })

        if (!genre) {
            throw new Error("Категория не найдена")
        }

        return genre
    }

    async getAll() {
        return await this.genreRepository.find({
            order: { createdAt: "DESC" }
        })
    }

    async create() {
        const defaultValues = {
            name: '', 
            slug: '',
        }

        const newGenre = this.genreRepository.create(defaultValues)
        const genre = await this.genreRepository.save(newGenre)
        return genre.id
    }

    async update(id: number, dto: GenreDto) {
        const genre = await this.byId(id)

        return this.genreRepository.save({
            ...genre, 
            name: dto.name,
            slug: this.slugService.generateSlug(dto.name, { upperCase:false, lowerCase:true })         
        })
    }

    async delete(id: number) {
        return this.genreRepository.delete(id)
    }
}

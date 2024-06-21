import { Injectable } from '@nestjs/common';
import { CategoriesEntity } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IsString } from 'class-validator';

export class CategoryDto {
    @IsString()
    name: string
}

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoriesEntity)
        private readonly categoryRepository: Repository<CategoriesEntity>,
    ) { }

    async byId(id: number) {
        const category = await this.categoryRepository.findOne({
            where: {
                id
            }
        })

        if (!category) {
            throw new Error("Категория не найдена")
        }

        return category
    }

    async update(id: number, dto: CategoryDto) {
        
    }
}

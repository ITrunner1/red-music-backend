import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { CommentDto } from './comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>
    ) { }

    async getAll() {
        return await this.commentRepository.find({
            where: { status: 'New'},
            order: { createdAt: "DESC" }
        })
    }

    async create(userId: number, dto: CommentDto) {
        const newComment = this.commentRepository.create({
            text: dto.text,
            song: { id: dto.songId },
            user: { id: userId }
        })

        return this.commentRepository.save(newComment)
    }
}

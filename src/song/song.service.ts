import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm';
import { hash } from 'argon2';
import { SongEntity } from 'src/song/song.entity';
import { SongDto } from './song.dto';

@Injectable()
export class SongService {
    constructor(       
        @InjectRepository(SongEntity)
        private readonly songRepository: Repository<SongEntity>,
    ) {}

    async byId(id: number, isPublic = false) {
        const song = await this.songRepository.findOne({
            where: isPublic ? {
            id, isPublic: true
            } : {
            id 
            },
            relations: {
                user: true,
                comments: {
                    user: true,
                }
            },
            select: {
                user: {
                    id: true,
                    name: true,
                    avatarPath: true,
                    isVerified: true,
                    subscribersCount: true,
                    subscriptions: true,
                },
            comments: {
                    text: true,
                    id: true,
                    user: {
                    id: true,
                    name: true,
                    avatarPath: true,
                    isVerified: true,
                    subscribersCount: true,
                    }
                }
            }       
        }) 
        
        if(!song) throw new NotFoundException('Song not found')

        return song        
    }

    async getAllSongs(searchTerm?: string) {
        let options: FindOptionsWhereProperty<SongEntity> = {}

        if(searchTerm)
            options = {
                name: ILike(`${searchTerm}`)
            }
        return this.songRepository.find({
            where: {
                ...options,
                isPublic: true
            },
            order: { 
                createdAt: 'DESC'
            },
            relations: {
                user: true,
                comments: {
                    user: true,
                }
            },
            select: {
                user: {
                    id: true,
                    name: true,
                    avatarPath: true,
                    isVerified: true
                },
            }
        })
    }

    async getMostPopularByListens(){
        return this.songRepository.find({
            where: {
                listens: MoreThan(0)
            },
            relations: {
                user: true,                
            },
            select: {
                user: {
                    id: true,
                    name: true,
                    avatarPath: true,
                    isVerified: true
                },
            },
            order: {
                listens: -1
            }
        })
    }

    async updateSong(id: number, dto: SongDto) {
        const song = await this.byId(id)

        return this.songRepository.save({
            ...song, ...dto
        })
        
    }   

    async createSong(userId:number) {
        const defaultValues = {
            name: '',
            user: { id: userId },
            songPath: '',
            description: '',
            thumbnailPath: ''
        }

        const newSong = this.songRepository.create(defaultValues)
        const song = await this.songRepository.save(newSong)
        return song.id
    }

    async deleteSong(id:number){
        return this.songRepository.delete(id)
    }

    async updateCountListens(id: number){
        const song = await this.byId(id)
        song.listens++
        
        return this.songRepository.save(song)
    }

    async updateReaction(id: number){
        const song = await this.byId(id)
        song.likes++
        
        return this.songRepository.save(song)
    }
}



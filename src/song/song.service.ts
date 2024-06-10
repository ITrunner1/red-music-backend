import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhereProperty, ILike, Like, MoreThan, Repository } from 'typeorm';
import { hash } from 'argon2';
import { SongEntity } from 'src/song/song.entity';
import { SongDto } from './song.dto';
import { LikeSongEntity } from './likeSong.entity';

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(SongEntity)
        private readonly songRepository: Repository<SongEntity>,
        @InjectRepository(LikeSongEntity)
        private readonly likeSongRepository: Repository<LikeSongEntity>,
    ) { }

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
                },
                playlist: true
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
                },
                playlist: {
                    name: true,
                    id: true,
                }
            }
        })

        if (!song) throw new NotFoundException('Song not found')

        return song
    }

    async getAllSongs(searchTerm?: string) {
        let options: FindOptionsWhereProperty<SongEntity> = {}

        if (searchTerm)
            options = {
                name: ILike(`%${searchTerm}%`)
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

    async getMostPopularByListens() {
        return this.songRepository.find({
            where: {
                listens: MoreThan(0),
                isPublic: true
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

    async createSong(userId: number) {
        const defaultValues = {
            name: '',
            user: { id: userId },
            songPath: '',
            lyrics: '',
            thumbnailPath: '',
        }

        const newSong = this.songRepository.create(defaultValues)
        const song = await this.songRepository.save(newSong)
        return song.id
    }

    async deleteSong(id: number) {
        return this.songRepository.delete(id)
    }

    async updateCountListens(id: number) {
        const song = await this.byId(id)
        song.listens++

        return this.songRepository.save(song)
    }

    async updateReaction(id: number, songId: number) {
        const song = await this.byId(songId)
        const data = {
          likedSong: { id: songId },
          userId: { id }
        }
    
        const isLiked = await this.likeSongRepository.findOneBy(data)
    
        if (!isLiked) {
          const newLike = this.likeSongRepository.create(data)
          this.likeSongRepository.save((newLike))
    
          song.likes++
          this.songRepository.save(song)
    
          return true
        }
    
        this.likeSongRepository.delete(data)
    
        song.likes--
        this.songRepository.save(song)    
    
        return false
      }
}



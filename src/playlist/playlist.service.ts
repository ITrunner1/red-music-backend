import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from './playlist.entity';
import { FindOptionsWhereProperty, ILike, Repository } from 'typeorm';
import { PlaylistDto } from 'src/playlist/playlist.dto';
import { LikePlaylistEntity } from './likePlaylist.entity';
import { PaginationService } from 'src/pagination/pagination.service';
import { GetAll } from 'src/song/getAll.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
    @InjectRepository(LikePlaylistEntity)
    private readonly likePlaylistRepository: Repository<LikePlaylistEntity>,
    private readonly paginationService: PaginationService
  ) { }

  async getPlaylistById(id: number, isPublic = false) {
    const playlist = await this.playlistRepository.findOne({
      where: isPublic ? {
        id, isPublic: true
      } : {
        id
      },
      relations: {
        user: true,
        songs: true,
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
        songs: {
          name: true,
          id: true,
          duration: true,
          audioPath: true,
          thumbnailPath: true,
          user: {
            id: true,
            name: true,
            avatarPath: true,
          }
        }
      }
    })

    if (!playlist) throw new NotFoundException('Playlist not found')

    return playlist
  }

  async getAllPlaylists(dto: GetAll) {
    let options: FindOptionsWhereProperty<PlaylistEntity> = {}
    const { searchTerm } = dto

    if (searchTerm)
      options = {
        name: ILike(`%${searchTerm}%`)
      }

    const { perPage, skip } = this.paginationService.getPagination(dto)

    const playlists = await this.playlistRepository.find({
      where: {
        ...options,
        isPublic: true
      },
      order: {
        createdAt: 'DESC'
      },
      relations: {
        user: true,
      },
      skip,
      take: perPage,
      select: {
        user: {
          id: true,
          name: true,
          avatarPath: true,
          isVerified: true
        },
      }
    })

    return {
      playlists, length: await this.playlistRepository.count({
        where: {
          ...options,
          isPublic: true
        }
      })
    }
  }

  async createPlaylist(userId: number) {
    const defaultValues = {
      name: '',
      thumbnailPath: '',
      description: '',
      user: { id: userId },
    }

    const newPlaylist = this.playlistRepository.create(defaultValues)
    const playlist = await this.playlistRepository.save(newPlaylist)
    return playlist.id
  }

  async updatePlaylist(id: number, dto: PlaylistDto) {
    const playlist = await this.getPlaylistById(id)

    return this.playlistRepository.save({
      ...playlist, ...dto
    })
  }

  async deletePlaylist(id: number) {
    return this.playlistRepository.delete(id)
  }

  async updateCountListens(id: number) {
    const playlist = await this.getPlaylistById(id)
    playlist.listens++

    return this.playlistRepository.save(playlist)
  }

  async updateReaction(id: number, playlistId: number) {
    const playlist = await this.getPlaylistById(playlistId)
    const data = {
      likedPlaylist: { id: playlistId },
      userId: { id }
    }

    const isLiked = await this.likePlaylistRepository.findOneBy(data)

    if (!isLiked) {
      const newLike = this.likePlaylistRepository.create(data)
      this.likePlaylistRepository.save((newLike))

      playlist.likes++
      this.playlistRepository.save(playlist)

      return true
    }

    this.likePlaylistRepository.delete(data)

    playlist.likes--
    this.playlistRepository.save(playlist)

    return false
  }
}

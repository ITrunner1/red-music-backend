import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from './playlist.entity';
import { PlaylistDto } from './playlist.dto';
import { FindOptionsWhereProperty, ILike, Repository } from 'typeorm';
import { SongDto } from 'src/song/song.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
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

  async getAllPlaylists(searchTerm?: string) {
    let options: FindOptionsWhereProperty<PlaylistEntity> = {}

    if (searchTerm)
      options = {
        name: ILike(`${searchTerm}`)
      }
    return this.playlistRepository.find({
      where: {
        ...options,
        isPublic: true
      },
      order: {
        createdAt: 'DESC'
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
          isVerified: true
        },
      }
    })
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
}

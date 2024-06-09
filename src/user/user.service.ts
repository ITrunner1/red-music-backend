import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionEntity } from './subscription.entity';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
  ) { }

  async byId(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        songs: true,
        subscriptions: {
          toArtist: true,
        },
        playlists: true
      },
      order: {
        createdAt: 'DESC'
      }
    })

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async updateProfile(id: number, dto: UserDto) {
    const isSameUser = await this.userRepository.findOne({
      where: { email: dto.email }
    })

    if (isSameUser && id !== isSameUser.id)
      throw new BadRequestException('Email already in use')

    const user = await this.byId(id)

    if (dto.password) {
      user.password = dto.password ? await hash(dto.password) : user.password
    }

    user.email = dto.email
    user.name = dto.name
    user.description = dto.description
    user.avatarPath = dto.avatarPath

    return this.userRepository.save(user)
  }

  async subscribe(id: number, artistId: number) {
    const user = await this.byId(artistId)
    const data = {
      toArtist: { id: artistId },
      fromUser: { id }
    }

    const isSubscribed = await this.subscriptionRepository.findOneBy(data)

    if (!isSubscribed) {
      const newSubscription = this.subscriptionRepository.create(data)
      this.subscriptionRepository.save((newSubscription))

      user.subscribersCount++  
      this.userRepository.save(user)
      
      return true
    }  

    this.subscriptionRepository.delete(data)

    this.userRepository.save(user)
    user.subscribersCount-- 

    return false
  }

  async getAllUsers() {
    return this.userRepository.find()
  }
}

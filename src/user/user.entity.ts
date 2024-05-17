import { SongEntity } from "src/song/song.entity";
import { Base } from "src/utils/base";
import { Column, Entity, OneToMany } from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";
import { PlaylistEntity } from "src/playlist/playlist.entity";
import { CommentEntity } from "src/comment/comment.entity";

@Entity('User')
export class UserEntity extends Base {
    @Column({unique:true})
    email: string

    @Column({})
    password: string

    @Column({default:''})
    name: string

    @Column({default: false, name: 'is_verified'})
    isVerified: boolean

    @Column({default:0, name: 'subscribers_count'})
    subscribersCount?: number

    @Column({default:'', type: 'text'})
    description: string

    @Column({default:'', name: 'avatar_path'})
    avatarPath: string

    @OneToMany(() => SongEntity, song => song.user)
    songs: SongEntity[]

    @OneToMany(() => PlaylistEntity, playlist => playlist.user)
    playlists: PlaylistEntity[]

    @OneToMany(() => CommentEntity, comment => comment.user)
    comments: SongEntity[]

    @OneToMany(() => SubscriptionEntity, sub => sub.fromUser)
    subscriptions: SubscriptionEntity[]

    @OneToMany(() => SubscriptionEntity, sub => sub.toArtist)
    subscribers: SubscriptionEntity[]
}
import { SongEntity } from "src/song/song.entity";
import { UserEntity } from "src/user/user.entity";
import { Base } from "src/utils/base";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { LikePlaylistEntity } from "./likePlaylist.entity";

@Entity('Playlists')
export class PlaylistEntity extends Base {

    @Column({ default: '', type: 'text' })
    name: string

    @Column({ default: '', name: 'description' })
    description: string

    @Column({ default: '', name: 'picture_path' })
    picturePath: string

    @Column({ default: false, name: 'is_public' })
    isPublic: boolean

    @Column({ default: 0 })
    listens?: number

    @Column({ default: 0 })
    likes?: number

    @Column({ default: '' })
    genre: string

    @Column({ default: 'New' })
    status: string

    @Column({ default: '' })
    rejectionReason: string

    @ManyToOne(() => UserEntity, user => user.playlists, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @OneToMany(() => SongEntity, playlist => playlist.playlist, { onDelete: 'SET NULL' })
    songs: SongEntity[]

    @OneToMany(() => LikePlaylistEntity, likePl => likePl.likedPlaylist, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'liked_playlist'})
    likedPlaylist: LikePlaylistEntity[]
}
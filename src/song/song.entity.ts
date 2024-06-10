import { CommentEntity } from "src/comment/comment.entity";
import { PlaylistEntity } from "src/playlist/playlist.entity";
import { UserEntity } from "src/user/user.entity";
import { Base } from "src/utils/base";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('Song')
export class SongEntity extends Base {

    @Column({ default: '' })
    name: string

    @Column({ default: false, name: 'is_public' })
    isPublic: boolean

    @Column({ default: 0 })
    listens?: number

    @Column({ default: 0 })
    likes?: number

    @Column({ default: 0 })
    duration?: number

    @Column({ default: '', type: 'text' })
    lyrics: string

    @Column({ default: '', name: 'audio_path' })
    audioPath: string

    @Column({ default: '', name: 'thumbnail_path' })
    thumbnailPath: string

    @ManyToOne(() => UserEntity, user => user.songs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToOne(() => PlaylistEntity, playlist => playlist.songs, { onDelete: 'SET NULL' })
    playlist: PlaylistEntity

    @OneToMany(() => CommentEntity, comment => comment.song, { onDelete: 'CASCADE' })
    comments: CommentEntity[]
}
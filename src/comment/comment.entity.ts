import { SongEntity } from "src/song/song.entity";
import { UserEntity } from "src/user/user.entity";
import { Base } from "src/utils/base";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('Comment')
export class CommentEntity extends Base {

    @Column({ default: '', type: 'text' })
    text: string

    @Column({ default: 'New', type: 'text'})
    status: string

    @Column({ default: '', type: 'text'})
    rejectedReason: string

    @ManyToOne(() => UserEntity, user => user.songs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToOne(() => SongEntity, song => song.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'song_id' })
    song: SongEntity
}
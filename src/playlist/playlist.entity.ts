import { SongEntity } from "src/song/song.entity";
import { UserEntity } from "src/user/user.entity";
import { Base } from "src/utils/base";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

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

    @ManyToOne(() => UserEntity, user => user.playlists, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @OneToMany(() => SongEntity, songs => songs.playlist, { onDelete: 'SET NULL' })
    songs: SongEntity[]
}
import { UserEntity } from "src/user/user.entity";
import { Base } from "src/utils/base";
import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { SongEntity } from "./song.entity";

@Entity('Liked_Songs')
export class LikeSongEntity extends Base {
    @ManyToOne(() => UserEntity, user => user.likedSongs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    userId: UserEntity

    @ManyToOne(() => SongEntity, user => user.likedSong, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'liked_song' })
    likedSong: SongEntity
}
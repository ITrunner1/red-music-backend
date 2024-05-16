import { SongEntity } from "src/song/song.entity";
import { UserEntity } from "src/user/user.entity";
import { Base } from "src/utils/base";
import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('Playlist')
export class PlaylistEntity extends Base {
    @ManyToOne(() => UserEntity, user => user.playlists)
    @JoinColumn({ name:'user_id' })
    user: UserEntity
    
    @OneToMany(() => SongEntity, songs => songs.playlist)
    songs: SongEntity[]
}
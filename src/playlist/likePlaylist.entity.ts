import { UserEntity } from "src/user/user.entity";
import { Base } from "src/utils/base";
import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PlaylistEntity } from "./playlist.entity";

@Entity('Liked_Playlists')
export class LikePlaylistEntity extends Base {
    @ManyToOne(() => UserEntity, user => user.likedPlaylists, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    userId: UserEntity

    @ManyToOne(() => PlaylistEntity, user => user.likedPlaylist, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'liked_playlist' })
    likedPlaylist: PlaylistEntity
}
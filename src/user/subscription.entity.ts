import { SongEntity } from "src/song/song.entity";
import { Base } from "src/utils/base";
import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('Subscription')
export class SubscriptionEntity extends Base {
    
    @ManyToOne(() => UserEntity, user => user.subscription)
    @JoinColumn({name: 'from_user_id'})
    fromUser: UserEntity

    @OneToMany(() => SongEntity, song => song.user)
    @JoinColumn({name: 'to_artist_id'})
    toArtist: UserEntity[]
}
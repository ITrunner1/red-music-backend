import { Base } from "src/utils/base"
import { Column, Entity } from "typeorm"

@Entity('Genre')
export class GenreEntity extends Base {

    @Column({ default: '', type: 'text' })
    name: string

    @Column({ default: '', type: 'text' })
    slug: string
}
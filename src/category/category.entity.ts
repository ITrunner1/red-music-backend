import { Base } from "src/utils/base"
import { Column, Entity } from "typeorm"

@Entity('Categories')
export class CategoriesEntity extends Base {

    @Column({ default: '', type: 'text' })
    name: string

}
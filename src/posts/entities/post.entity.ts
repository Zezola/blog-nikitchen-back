import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        length: 100
    })
    title: string

    @Column("text")
    content: string
}

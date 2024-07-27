import { ApiProperty } from "@nestjs/swagger"
import { Post } from "@prisma/client"

export class PostEntity implements Post{
    @ApiProperty()
    id:number

    @ApiProperty()
    title: string

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    content: string

    @ApiProperty({required: false, nullable: true})
    authorId: number | null

}

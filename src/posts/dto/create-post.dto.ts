export class CreatePostDto {
    id:number
    title: string
    createdAt: Date
    content: string
    authorId: number | null
}

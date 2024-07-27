import { Injectable, Inject } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    const authorId = createPostDto.authorId; 
    if (this.prismaService.user.findUnique({where: {id: authorId}})) {
      return this.prismaService.post.create({data: createPostDto})
    }
    return `No author with given id exists`    
  }

  async findAll() {
    return this.prismaService.post.findMany();
  }

  findOne(id: number) {
    return this.prismaService.post.findUnique({where: {id}})
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prismaService.post.update({
      where: {id}, 
      data: updatePostDto
    });
  }

  remove(id: number) {
    return this.prismaService.post.delete({where: {id}})
  } 
}

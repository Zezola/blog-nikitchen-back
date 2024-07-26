import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const newUserDto: CreateUserDto = {
      name: createUserDto.name, 
      email: createUserDto.email,
      password: hash
    }
    return this.prismaService.user.create({data: newUserDto});
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const saltOrRounds = 10;
      const password = updateUserDto.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      const newUpdateUserDTO: UpdateUserDto = {
        password: hash
      }
      return this.prismaService.user.update({
        where: {id},
        data: newUpdateUserDTO
      })
    }
    return this.prismaService.user.update({
      where: {id},
      data: updateUserDto
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({where: {id}});
  }
}

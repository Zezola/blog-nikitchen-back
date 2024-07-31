import { Req, Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/auth-guard.guard';


@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({type: UserEntity})
  create(@Req() request: Request, @Body() createUserDto: CreateUserDto) {
    
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({type: UserEntity, isArray: true})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: UserEntity})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: UserEntity})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: UserEntity})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

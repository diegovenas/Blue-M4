import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('/users') //rota PAI
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Lista todos os usuarios',
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lista usuario por ID!',
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Cria um novo usuario!',
  })
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um usuario!',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um usuario!',
  })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, dto);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/PRISMA/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/updateUser.dto';
import { handleContrainsError } from 'src/utils/handle-error-unique.util';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async verifyID(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(` O ID (...${id}...) não foi encontrado :( `);
    }

    return user;
  }

  findOne(id: string) {
    return this.verifyID(id);
  }

  create(dto: CreateUserDto): Promise<User | void> {
    const hashedPassword = bcrypt.hashSync(dto.password, 8);
    const data: CreateUserDto = {
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    };

    return this.prisma.user.create({ data }).catch(handleContrainsError);
  }

  async remove(id: string) {
    await this.verifyID(id);

    return this.prisma.user.delete({
      where: { id },
      select: { name: true, email: true },
    });
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | void> {
    await this.verifyID(id);

    return this.prisma.user
      .update({ where: { id }, data: dto })
      .catch(handleContrainsError);
  }
}

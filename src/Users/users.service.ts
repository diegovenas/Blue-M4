import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/PRISMA/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/updateUser.dto';
import { handleContrainsError } from 'src/utils/handle-error-unique.util';
import { Favorite } from 'src/favorites/entities/favorite-entitie';

@Injectable()
export class UsersService {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    updatedAt: true,
    createdAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: {
        ...this.userSelect,
        favorites: true,
      },
    });
  }

  async verifyID(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
      select: {
        ...this.userSelect,
        favorites: true,
      },
    });

    if (!user) {
      throw new NotFoundException(` O ID (...${id}...) não foi encontrado :( `);
    }

    return user;
  }

  findOne(id: string) {
    return this.verifyID(id);
  }

  async create(dto: CreateUserDto): Promise<User | void> {
    const hashedPassword = bcrypt.hashSync(dto.password, 8);
    const data: CreateUserDto = {
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    };

    return this.prisma.user
      .create({ data, select: this.userSelect })
      .catch(handleContrainsError);
  }

  async remove(id: string) {
    await this.verifyID(id);

    return this.prisma.user.delete({
      where: { id },
      select: this.userSelect,
    });
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | void> {
    await this.verifyID(id);

    return this.prisma.user
      .update({ where: { id }, data: dto, select: this.userSelect })
      .catch(handleContrainsError);
  }

  async findFavoriteProducts(id: string): Promise<Favorite[]> {
    await this.verifyID(id);

    return this.prisma.favorite.findMany({
      where: { userId: id },
      select: { productName: true },
    });
  }
}

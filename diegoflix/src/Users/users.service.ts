import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/users.entity';
import { uuid } from 'uuidv4';

@Injectable()
export class UsersService {
  users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: uuid(),
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  // create() {
  //   return 'Criação';
  // }
}

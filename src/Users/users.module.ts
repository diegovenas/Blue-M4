import { Module } from '@nestjs/common';
import { prismaModule } from 'src/PRISMA/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [prismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

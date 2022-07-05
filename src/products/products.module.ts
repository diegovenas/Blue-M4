import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { prismaModule } from 'src/PRISMA/prisma.module';

@Module({
  imports: [prismaModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

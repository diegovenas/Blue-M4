import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { prismaModule } from 'src/PRISMA/prisma.module';

@Module({
  imports: [prismaModule],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Table } from '@prisma/client';
import { PrismaService } from 'src/PRISMA/prisma.service';
import { handleContrainsError } from 'src/utils/handle-error-unique.util';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TablesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTableDto): Promise<Table> {
    return this.prisma.table.create({ data: dto }).catch(handleContrainsError);
  }

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  async verifyID(id: string): Promise<Table> {
    const table: Table = await this.prisma.table.findUnique({ where: { id } });

    if (!table) {
      throw new NotFoundException(` O ID (...${id}...) não foi encontrado :( `);
    }

    return table;
  }

  findOne(id: string): Promise<Table> {
    return this.verifyID(id);
  }

  async update(id: string, dto: UpdateTableDto): Promise<Table> {
    await this.verifyID(id);

    return this.prisma.table
      .update({ where: { id }, data: dto })
      .catch(handleContrainsError);
  }

  async remove(id: string) {
    await this.verifyID(id);

    return this.prisma.table.delete({
      where: { id },
      select: { number: true },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/PRISMA/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { handleContrainsError } from 'src/utils/handle-error-unique.util';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    return this.prisma.category
      .create({ data: dto })
      .catch(handleContrainsError);
  }

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async verifyIDCategory(id: string): Promise<Category> {
    const category: Category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(` O ID (...${id}...) não foi encontrado :( `);
    }

    return category;
  }

  findOne(id: string): Promise<Category> {
    return this.verifyIDCategory(id);
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    await this.verifyIDCategory(id);
    return this.prisma.category
      .update({ where: { id }, data: dto })
      .catch(handleContrainsError);
  }

  async remove(id: string) {
    await this.verifyIDCategory(id);

    return this.prisma.category.delete({
      where: { id },
      select: { name: true },
    });
  }
}

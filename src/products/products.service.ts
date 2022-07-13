import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/PRISMA/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { handleContrainsError } from 'src/utils/handle-error-unique.util';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async verifyID(id: string): Promise<Product> {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(` O ID (...${id}...) não foi encontrado :( `);
    }

    return product;
  }

  findOne(id: string): Promise<Product> {
    return this.verifyID(id);
  }

  async create(dto: CreateProductDto): Promise<Product | void> {
    return this.prisma.product
      .create({ data: dto })
      .catch(handleContrainsError);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product | void> {
    await this.verifyID(id);
    return this.prisma.product
      .update({ where: { id }, data: dto })
      .catch(handleContrainsError);
  }

  async remove(id: string) {
    await this.verifyID(id);
    return this.prisma.product.delete({ where: { id } });
  }
}

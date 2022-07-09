import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/PRISMA/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

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

  handleContrainsError(error: Error): never {
    const splitedMessage = error.message.split('`');
    const errorMessage = `Entrada '${
      splitedMessage[splitedMessage.length - 2]
    }' não está respeitando a constraint UNIQUE`;
    throw new UnprocessableEntityException(errorMessage);
  }

  findOne(id: string): Promise<Product> {
    return this.verifyID(id);
  }

  create(dto: CreateProductDto): Promise<Product | void> {
    return this.prisma.product
      .create({ data: dto })
      .catch(this.handleContrainsError);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product | void> {
    await this.verifyID(id);
    return this.prisma.product
      .update({ where: { id }, data: dto })
      .catch(this.handleContrainsError);
  }

  async remove(id: string) {
    await this.verifyID(id);
    return this.prisma.product.delete({ where: { id } });
  }
}

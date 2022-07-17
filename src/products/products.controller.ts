import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { FavoriteProductDto } from '../favorites/dto/favoritar.dto';
import { Favorite } from 'src/favorites/entities/favorite-entitie';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Listagem de produtos',
  })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Listagem de um produto',
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criação de produtos!',
  })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar produto!',
  })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar produto!',
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post('favorite')
  @ApiOperation({
    summary: 'Favoritar produto',
  })
  favorite(@Body() dto: FavoriteProductDto): Promise<Favorite> {
    return this.productsService.favorite(dto);
  }

  @Delete('favorite/:id')
  @ApiOperation({
    summary: 'Desfavoritar produto',
  })
  unfavorite(@Param('id') id: string) {
    return this.productsService.unfavorite(id);
  }

  @Get(':id/users-liked')
  @ApiOperation({
    summary: 'Lista de usuarios que tenham o produto listado como favorito',
  })
  findUsersLiked(@Param('id') id: string) {
    return this.productsService.findUsersLiked(id);
  }
}

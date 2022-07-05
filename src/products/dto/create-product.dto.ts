import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do produto.',
    example: 'Determinar o nome de um produto: Hamburguer diego',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descriçao do produto.',
    example: 'Feito de tal e tal e tal item ',
  })
  description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Valor $ do produto.',
    example: '10,00 $',
  })
  price: number;

  @ApiProperty({
    description: 'Imagem do produto.',
    example: 'URL online',
  })
  @IsNotEmpty()
  image: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Diego Venas',
    description: 'NOME do usuario a ser criado',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'Diego@Venas.com',
    description: 'EMAIL do usuario a ser criado',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: 'Gremio108*',
    description:
      'SENHA do usuario a ser criado, minimo 6 caracters, uma letra maiuscula, uma minuscula e um simbolo',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  password: string;
}

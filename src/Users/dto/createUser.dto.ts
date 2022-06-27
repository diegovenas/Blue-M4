import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Diego Venas',
    description: 'User name',
  })
  name: string;

  @ApiProperty({
    example: 'Diego@venas.com',
    description: 'Email User',
  })
  @IsEmail()
  email: string;
}

// export class UpdateUserDto {
//   name?: string;
//   email?: string;
// }

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

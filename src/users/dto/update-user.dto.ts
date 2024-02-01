import { PartialType } from '@nestjs/mapped-types';
import { SignupUserDto } from '../../auth/dto/signup-user.dto';

export class UpdateUserDto extends PartialType(SignupUserDto) { }

import {
  IsAscii,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsMobilePhone,
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdatePlayerDto {
  @IsNotEmpty()
  readonly id: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone()
  readonly cellPhone: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @IsAscii()
  readonly name: string;
  readonly ranking?: string;
  readonly rankingPosition?: number;
  readonly urlPhoto?: string;
}

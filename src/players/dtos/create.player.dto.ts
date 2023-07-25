import {
  IsAscii,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsMobilePhone,
} from 'class-validator';

export class CreatePlayerDto {
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
}

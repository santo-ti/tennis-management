import {
  IsUUID,
  IsAscii,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsMobilePhone,
} from 'class-validator';

export class UpdatePlayerDto {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

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

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoryEventDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly operation: string;

  @IsNotEmpty()
  @IsNumber()
  readonly value: number;
}

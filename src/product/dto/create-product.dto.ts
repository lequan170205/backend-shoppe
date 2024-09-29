import { IsString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsUrl, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  readonly discountedPrice?: number;

  @IsNumber()
  @Min(0)
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly imageUrl: string;

  @IsString()
  @IsOptional()
  readonly brand?: string;

  @IsString()
  @IsNotEmpty()
  readonly categoryId: string;
}
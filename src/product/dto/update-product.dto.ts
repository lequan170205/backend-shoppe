import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsUrl,
    Min,
  } from 'class-validator';
  
  export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsNumber()
    @IsPositive()
    price: number;
  
    @IsNumber()
    @IsOptional()
    @Min(0)
    discountedPrice?: number;
  
    @IsNumber()
    @Min(0)
    stock: number;
  
    @IsUrl()
    @IsNotEmpty()
    imageUrl: string;
  
    @IsString()
    @IsOptional()
    brand?: string;
  }
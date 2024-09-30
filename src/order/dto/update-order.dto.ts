import { IsString, IsOptional, IsObject } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsObject()
  shippingAddress: {
    addressLine: string;
    city: string;
    postalCode: string;
    country: string;
  };

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  paymentStatus?: string;
}

import { IsNotEmpty, IsArray, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsArray()
  products: {
    productId: string;
    quantity: number;
  }[];

  @IsNotEmpty()
  shippingAddress: {
    addressLine: string;
    city: string;
    postalCode: string;
    country: string;
  };

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}

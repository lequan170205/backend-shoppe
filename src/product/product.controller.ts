import { Body, Controller, UseGuards, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Product } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('find')
  async getAllProducts() {
    return this.productService.findAllProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.addProduct(createProductDto);
  }
}

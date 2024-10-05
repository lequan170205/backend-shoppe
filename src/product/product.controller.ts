import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('find')
  async getAllProducts() {
    return this.productService.findAllProducts();
  }

  @Post('add')
  async addProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.addProduct(createProductDto);
  }

  @Get('find/:id')
  async findProductById(@Param('id') id: string) {
    const findProductId = await this.productService.findProductById(id);
    return findProductId;
  }


  
  @Patch(':id')
  updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProductById(id, updateProductDto);
  }
}
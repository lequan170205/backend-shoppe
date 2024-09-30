import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find/user/:userId')
  async getOrdersByUser(@Param('userId') userId: string): Promise<Order[]> {
    return this.orderService.getOrdersByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find/:orderId')
  async getOrderById(@Param('orderId') orderId: string): Promise<Order> {
    return this.orderService.getOrderById(orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @UseGuards(JwtAuthGuard)
  @Post('update/:orderId')
  async updateOrder(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(orderId, updateOrderDto);
  }
}

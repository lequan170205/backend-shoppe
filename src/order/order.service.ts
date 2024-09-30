import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../user/schemas/user.schema';
import { Product } from '../product/schemas/product.schema';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, products, shippingAddress, phoneNumber } = createOrderDto;

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const productDetails = await Promise.all(
      products.map(async (product) => {
        const foundProduct = await this.productModel.findById(
          product.productId,
        );
        if (!foundProduct) {
          throw new NotFoundException(
            `Product not found: ${product.productId}`,
          );
        }
        if (foundProduct.stock < product.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product: ${foundProduct.name}`,
          );
        }
        foundProduct.stock -= product.quantity;
        await foundProduct.save();
        return {
          ...product,
          price: foundProduct.price,
        };
      }),
    );

    const totalPrice = productDetails.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0,
    );

    const newOrder = new this.orderModel({
      userId,
      products: productDetails,
      totalPrice,
      shippingAddress,
      phoneNumber,
    });

    return newOrder.save();
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    const orders = await this.orderModel
      .find({ userId })
      .populate('products.productId')
      .exec();
    if (!orders.length) {
      throw new NotFoundException('No orders found for this user');
    }
    return orders;
  }

  async updateOrder(
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      orderId,
      { $set: updateOrderDto },
      { new: true },
    );

    if (!updatedOrder) {
      throw new NotFoundException('Order not found');
    }

    return updatedOrder;
  }

  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.orderModel
      .findById(orderId)
      .populate('products.productId');
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }
}

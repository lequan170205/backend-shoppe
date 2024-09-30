import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async updateUser(UpdateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      UpdateUserDto.id,
      UpdateUserDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  async findUserById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userModel.findById(id).lean();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async findAllUser() {
    const users = await this.userModel.find().lean();
    if (!users.length) {
      throw new NotFoundException('There are no user left');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = users.map(({ password, ...rest }) => rest);
    return result;
  }
}

import { Body, Controller, Param, UseGuards, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return this.userService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find/:id')
  async getUserById(@Param('id') id: string): Promise<Omit<User, 'password'>> {
    return this.userService.findUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  async getAllUser() {
    return this.userService.findAllUser();
  }
}

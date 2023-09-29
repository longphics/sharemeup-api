import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { UsersService } from './users.service';
import { UpdateCartDto } from './dtos';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }

  // @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@GetUser() user: User) {
    const userId = 'user3';

    return await this.usersService.getMe(userId);
  }

  @Get('cart')
  async getCart(@GetUser() user: User) {
    const userId = 'user3';

    return await this.usersService.getCart(userId);
  }

  @Post('cart')
  async updateCart(@GetUser() user: User, @Body() dto: UpdateCartDto) {
    const userId = 'user3';

    return await this.usersService.updateCart(userId, dto.cartElements);
  }
}

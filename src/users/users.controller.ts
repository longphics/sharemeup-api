import {
  Controller,
  Get,
  Body,
  Post,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
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

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@GetUser() user: User) {
    const userId = user.id;

    // const userId = 'user3';

    return await this.usersService.getMe(userId);
  }

  // Done
  @UseGuards(JwtGuard)
  @Post('cart')
  async updateCart(@GetUser() user: User, @Body() dto: UpdateCartDto) {
    const userId = user.id;
    const itemId = dto.itemId;
    const amount = dto.amount;

    try {
      return await this.usersService.updateCart(userId, itemId, amount);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

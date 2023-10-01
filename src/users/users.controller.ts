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

  // Done
  @Get()
  async getAll() {
    try {
      return await this.usersService.getAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // Done
  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@GetUser() user: User) {
    try {
      const userId = user.id;
      return await this.usersService.getMe({ userId });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // Done
  @UseGuards(JwtGuard)
  @Post('cart')
  async updateCart(@GetUser() user: User, @Body() dto: UpdateCartDto) {
    try {
      const userId = user.id;
      const itemId = dto.itemId;
      const amount = dto.amount;
      return await this.usersService.updateCart({ userId, itemId, amount });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // Done
  @UseGuards(JwtGuard)
  @Post('edit')
  async editProfile(@GetUser() user: User, @Body() dto: any) {
    try {
      const userId = user.id;
      const name = dto.name;
      const phone = dto.phone;
      const address = dto.address;

      return await this.usersService.editProfile({
        userId,
        name,
        phone,
        address,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

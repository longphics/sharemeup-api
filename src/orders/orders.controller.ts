import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // Done
  @Get()
  async getAll() {
    try {
      return await this.ordersService.getAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // Done
  @UseGuards(JwtGuard)
  @Post('create')
  async create(@GetUser() user: User, @Body() dto: any) {
    try {
      const userId = user.id;
      const storeId = dto.storeId;
      return await this.ordersService.create({
        userId,
        storeId,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post('status')
  async changeOrderStatus(@Body() dto: any) {
    return await this.ordersService.changeOrderStatus(dto);
  }

  // Done
  @Post('feedback')
  async sendFeedback(@Body() dto: any) {
    try {
      const props = {
        itemId: dto.itemId,
        userId: dto.userId,
        star: parseInt(dto.star),
        text: dto.text,
      };
      return await this.ordersService.sendFeedback(props);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

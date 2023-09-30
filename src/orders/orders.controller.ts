import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getAll() {
    return await this.ordersService.getAll();
  }

  @UseGuards(JwtGuard)
  @Post('create')
  async create(@GetUser() user: User, @Body() dto: any) {
    const userId = user.id;
    // const userId = 'user3';

    const storeId = dto.storeId;
    const phone = dto.phone;
    const address = dto.address;

    return await this.ordersService.create(userId, storeId, phone, address);
  }

  @Post('status')
  async changeOrderStatus(@Body() dto: any) {
    return await this.ordersService.changeOrderStatus(dto);
  }
}

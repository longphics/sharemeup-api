import { Body, Controller, Get, Post } from '@nestjs/common';

import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getAll() {
    return await this.ordersService.getAll();
  }

  @Post('create')
  async create(@Body() dto: any) {
    const userId = 'user3';

    const storeId = dto.storeId;
    const phone = dto.phone;
    const address = dto.address;

    return await this.ordersService.create(userId, storeId, phone, address);
  }
}

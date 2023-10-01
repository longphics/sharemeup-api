import {
  Controller,
  Get,
  BadRequestException,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  // Done
  @Get()
  async getAll() {
    try {
      return await this.storesService.getAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // Done
  @UseGuards(JwtGuard)
  @Post('edit')
  async editStore(@GetUser() user: User, @Body() dto: any) {
    try {
      const userId = user.id;
      const name = dto.name;
      const phone = dto.phone;
      const address = dto.address;

      return await this.storesService.editStore({
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

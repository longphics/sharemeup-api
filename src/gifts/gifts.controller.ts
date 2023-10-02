import { Controller, Get, BadRequestException } from '@nestjs/common';

import { GiftsService } from './gifts.service';

@Controller('gifts')
export class GiftsController {
  constructor(private giftsService: GiftsService) {}

  // Done
  @Get()
  async getAll() {
    try {
      return await this.giftsService.getAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

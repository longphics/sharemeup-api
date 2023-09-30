import { Controller, Get, BadRequestException } from '@nestjs/common';

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
}

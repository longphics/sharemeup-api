import { Controller, Get } from '@nestjs/common';

import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get()
  async getAll() {
    return await this.storesService.getAll();
  }
}

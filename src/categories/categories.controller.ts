import { Controller, Get, BadRequestException } from '@nestjs/common';

import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getAll() {
    try {
      return await this.categoriesService.getAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

import { Controller, Get } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Controller('prisma')
export class PrismaController {
  constructor(private prismaService: PrismaService) {}

  @Get('init')
  async init() {
    return await this.prismaService.init();
  }
}

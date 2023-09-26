import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.store.findMany({
      include: {
        owner: true,
      },
    });
  }
}

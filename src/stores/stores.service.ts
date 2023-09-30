import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  // Done
  async getAll() {
    return await this.prisma.store.findMany({
      select: {
        id: true,
        follow: true,
        sold: true,
        star: true,
        deleted: true,
        name: true,
        avatar: true,
        background: true,
        address: true,
        ownerId: true,
      },
    });
  }
}

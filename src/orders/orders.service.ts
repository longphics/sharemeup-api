import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.order.findMany({
      include: {
        store: {
          select: {
            id: true,
            name: true,
          },
        },
        item_order: {
          include: {
            item: true,
          },
        },
      },
    });
  }
}

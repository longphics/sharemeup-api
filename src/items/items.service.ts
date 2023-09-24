import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.item.findMany({
      include: {
        store: true,
        category: true,
        options: true,
        shippingMethods: true,
        feedbacks: {
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }
}
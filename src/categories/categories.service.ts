import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        filters: {
          select: {
            id: true,
            name: true,
            options: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }
}

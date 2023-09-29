import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.item.findMany({
      include: {
        store: true,
        category: {
          include: {
            filters: true,
          },
        },
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

  async create(userId: string, dto: any, imageUri: string) {
    const store = await this.prisma.store.findUnique({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
      },
    });
    const storeId = store.id;

    const options = dto.options.split(',');

    const newItem = {
      stock: parseInt(dto.stock),
      name: dto.name,
      description: dto.description,
      expired: new Date(dto.dateString),
      images: [imageUri],
      store: { connect: { id: storeId } },
      category: { connect: { id: dto.categoryId } },
      options: {
        connect: options.map((option: string) => ({ id: option })),
      },
    };

    const res = await this.prisma.item.create({ data: newItem });

    return res;
  }
}

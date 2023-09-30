import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  // Done
  async getAll() {
    return await this.prisma.item.findMany({
      select: {
        id: true,
        createAt: true,
        sold: true,
        star: true,
        stock: true,
        name: true,
        description: true,
        expired: true,
        images: true,
        storeId: true,
        category: {
          select: {
            id: true,
            name: true,
            filters: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        options: {
          select: {
            id: true,
            name: true,
            filterId: true,
          },
        },
        shippingMethods: {
          select: {
            id: true,
            name: true,
          },
        },
        feedbacks: {
          select: {
            id: true,
            createAt: true,
            text: true,
            star: true,
            userId: true,
          },
        },
      },
    });
  }

  // Done
  async create({
    userId,
    stock,
    name,
    description,
    expired,
    imageUri,
    categoryId,
    optionIds,
  }: {
    userId: string;
    stock: number;
    name: string;
    description: string;
    expired: Date;
    imageUri: string;
    categoryId: string;
    optionIds: string[];
  }) {
    const store = await this.prisma.store.findUnique({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
      },
    });

    const storeId = store.id;

    const newItem = {
      stock: stock,
      name: name,
      description: description,
      expired: expired,
      images: [imageUri],
      store: { connect: { id: storeId } },
      category: { connect: { id: categoryId } },
      options: {
        connect: optionIds.map((optionId: string) => ({ id: optionId })),
      },
    };

    return await this.prisma.item.create({ data: newItem });
  }
}

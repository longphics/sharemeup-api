import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.user.findMany({
      include: {
        cartElements: {
          select: {
            amount: true,
            item: {
              include: {
                store: true,
              },
            },
          },
        },
      },
    });
  }

  async getMe(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        ownStore: true,
      },
    });
  }

  async getCart(userId: string) {
    const res = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        cartElements: {
          select: {
            amount: true,
            item: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const cartElements = res.cartElements.map((cartElement) => ({
      amount: cartElement.amount,
      itemId: cartElement.item.id,
    }));

    return cartElements;
  }

  async updateCart(userId: string, cartElements: any[]) {
    await this.prisma.cartElement.deleteMany({
      where: {
        userId,
      },
    });

    if (cartElements.length === 0) {
      return await this.getCart(userId);
    }

    const data = cartElements.map((cartElement) => ({
      ...cartElement,
      userId,
    }));

    await this.prisma.cartElement.createMany({
      data,
    });

    return await this.getCart(userId);
  }
}

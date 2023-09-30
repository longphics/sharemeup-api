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

  // Done
  async updateCart(userId: string, itemId: string, amount: number) {
    if (!amount) {
      return await this.prisma.cartElement.delete({
        where: {
          userId_itemId: {
            userId,
            itemId,
          },
        },
      });
    }

    const cartElements = await this.prisma.cartElement.findUnique({
      where: {
        userId_itemId: {
          userId,
          itemId,
        },
      },
    });

    if (!cartElements) {
      return await this.prisma.cartElement.create({
        data: {
          amount,
          user: { connect: { id: userId } },
          item: { connect: { id: itemId } },
        },
      });
    } else {
      return await this.prisma.cartElement.update({
        where: {
          userId_itemId: {
            userId,
            itemId,
          },
        },
        data: {
          amount,
        },
      });
    }
  }
}

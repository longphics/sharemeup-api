import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Done
  async getAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        goodAction: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        avatar: true,
        background: true,
      },
    });
  }

  // Done
  async getMe({ userId }: { userId: string }) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        ownStore: {
          select: {
            id: true,
          },
        },
        cartElements: {
          select: {
            amount: true,
            item: {
              select: {
                id: true,
                storeId: true,
              },
            },
          },
        },
      },
    });
  }

  // Done
  async updateCart({
    userId,
    itemId,
    amount,
  }: {
    userId: string;
    itemId: string;
    amount: number;
  }) {
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

  // Done
  async editProfile({
    userId,
    name,
    phone,
    address,
  }: {
    userId: string;
    name: string;
    phone: string;
    address: string;
  }) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        phone,
        address,
      },
    });
  }
}

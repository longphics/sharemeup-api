import { Injectable } from '@nestjs/common';
import { CartElement } from '@prisma/client';

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
    });
  }

  async updateCart(cartElements: CartElement[]) {
    return await this.prisma.cartElement.deleteMany({
      where: {
        userId: cartElements[0].userId,
      },
    });
  }
}

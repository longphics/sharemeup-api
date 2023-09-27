import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.user.findMany({
      include: {
        item_user: {
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
}

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async get() {
    return await this.prisma.user.findUnique({
      where: {
        id: 'user3',
      },
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
}

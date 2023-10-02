import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GiftsService {
  constructor(private prisma: PrismaService) {}

  // Done
  async getAll() {
    return await this.prisma.gift.findMany({
      select: {
        id: true,
        createAt: true,
        status: true,
        description: true,
        images: true,
        name: true,
        amount: true,
        postId: true,
        giveUserId: true,
        receiveUserId: true,
      },
    });
  }
}

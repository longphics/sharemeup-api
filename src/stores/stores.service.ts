import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  // Done
  async getAll() {
    return await this.prisma.store.findMany({
      select: {
        id: true,
        follow: true,
        sold: true,
        star: true,
        deleted: true,
        name: true,
        avatar: true,
        background: true,
        address: true,
        phone: true,
        ownerId: true,
      },
    });
  }

  // Done
  async editStore({
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
    return await this.prisma.store.update({
      where: {
        ownerId: userId,
      },
      data: {
        name,
        phone,
        address,
      },
    });
  }
}

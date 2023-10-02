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

  // Done
  async create({
    description,
    imageUri,
    name,
    amount,
    postId,
    giverId,
    receiverId,
  }: {
    description: string;
    imageUri: string;
    name: string;
    amount: number;
    postId: string;
    giverId: string;
    receiverId: string;
  }) {
    const newGift = {
      status: 'Waiting',
      description,
      images: [imageUri],
      name,
      amount,
      post: { connect: { id: postId } },
      giveUser: { connect: { id: giverId } },
      receiveUser: { connect: { id: receiverId } },
    };

    return await this.prisma.gift.create({
      data: newGift,
    });
  }

  // Done
  async changeGiftStatus({
    giftId,
    status,
  }: {
    giftId: string;
    status: string;
  }) {
    return await this.prisma.gift.update({
      where: {
        id: giftId,
      },
      data: {
        status,
      },
    });
  }
}

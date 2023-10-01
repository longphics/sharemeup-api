import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // Done
  async getAll() {
    return await this.prisma.order.findMany({
      select: {
        id: true,
        createAt: true,
        status: true,
        note: true,
        userId: true,
        storeId: true,
        orderElements: {
          select: {
            amount: true,
            orderId: true,
            itemId: true,
          },
        },
      },
    });
  }

  // Done
  async create({ userId, storeId }: { userId: string; storeId: string }) {
    const cartElements = await this.prisma.cartElement.findMany({
      where: {
        userId: userId,
        item: {
          storeId: storeId,
        },
      },
      select: {
        amount: true,
        itemId: true,
      },
    });

    const orderElements = cartElements.map((cartElement) => ({
      amount: cartElement.amount,
      item: { connect: { id: cartElement.itemId } },
    }));

    const newOrder = {
      status: 'Waiting',
      note: 'This is note',
      user: { connect: { id: userId } },
      store: { connect: { id: storeId } },
      orderElements: {
        create: orderElements,
      },
    };

    return await this.prisma.order.create({
      data: newOrder,
    });
  }

  async changeOrderStatus(dto: any) {
    const orderId = dto.orderId;
    const newStatus = dto.status;

    return await this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: newStatus,
      },
    });
  }
}

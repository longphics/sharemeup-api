import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        store: {
          select: {
            id: true,
            name: true,
          },
        },
        orderElements: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async create(
    userId: string,
    storeId: string,
    phone: string,
    address: string,
  ) {
    // cartItems tuong ung

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
      phone,
      address,
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
}

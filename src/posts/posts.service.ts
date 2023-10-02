import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // Done
  async getAll() {
    return await this.prisma.post.findMany({
      select: {
        id: true,
        createAt: true,
        text: true,
        images: true,
        createUserId: true,
        likeUsers: {
          select: {
            id: true,
          },
        },
        dislikeUsers: {
          select: {
            id: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
        gifts: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  // Done
  async create({
    userId,
    description,
    imageUri,
  }: {
    userId: string;
    description: string;
    imageUri: string;
  }) {
    const newPost = {
      text: description,
      images: [imageUri],
      createUser: { connect: { id: userId } },
    };

    return await this.prisma.post.create({
      data: newPost,
    });
  }
}

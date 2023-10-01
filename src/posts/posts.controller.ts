import { Controller, Get, BadRequestException } from '@nestjs/common';

import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // Done
  @Get()
  async getAll() {
    try {
      return this.postsService.getAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

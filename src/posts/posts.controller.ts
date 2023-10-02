import {
  Controller,
  Get,
  BadRequestException,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private config: ConfigService,
  ) {}

  // Done
  @Get()
  async getAll() {
    try {
      return this.postsService.getAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // Done
  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
          );
        },
      }),
    }),
  )
  async create(@UploadedFile() file: any, @Body() dto: any) {
    try {
      const imageUri = this.config.get('BACKEND_URL') + '/' + file.filename;

      const props = {
        userId: dto.userId,
        description: dto.description,
        imageUri,
      };

      return await this.postsService.create(props);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

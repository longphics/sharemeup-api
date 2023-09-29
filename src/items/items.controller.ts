import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';

import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(
    private itemsService: ItemsService,
    private config: ConfigService,
  ) {}

  @Get()
  async getAll() {
    return await this.itemsService.getAll();
  }

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
    const userId = 'user2';

    const imageUri = this.config.get('BACKEND_URL') + '/' + file.filename;

    return await this.itemsService.create(userId, dto, imageUri);
  }
}

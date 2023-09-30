import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(
    private itemsService: ItemsService,
    private config: ConfigService,
  ) {}

  // Done
  @Get()
  async getAll() {
    try {
      return await this.itemsService.getAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // Done
  @UseGuards(JwtGuard)
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
  async create(
    @GetUser() user: User,
    @UploadedFile() file: any,
    @Body() dto: any,
  ) {
    try {
      const userId = user.id;

      const imageUri = this.config.get('BACKEND_URL') + '/' + file.filename;

      const props = {
        userId,
        stock: parseInt(dto.stock),
        name: dto.name,
        description: dto.description,
        expired: new Date(dto.dateString),
        imageUri,
        categoryId: dto.categoryId,
        optionIds: dto.options.split(','),
      };

      return await this.itemsService.create(props);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

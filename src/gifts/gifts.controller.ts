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

import { GiftsService } from './gifts.service';

@Controller('gifts')
export class GiftsController {
  constructor(
    private giftsService: GiftsService,
    private config: ConfigService,
  ) {}

  // Done
  @Get()
  async getAll() {
    try {
      return await this.giftsService.getAll();
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
        description: dto.description,
        imageUri: imageUri,
        name: dto.name,
        amount: parseInt(dto.amount),
        postId: dto.postId,
        giverId: dto.giverId,
        receiverId: dto.receiverId,
      };

      return await this.giftsService.create(props);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // Done
  @Post('status')
  async changeGiftStatus(@Body() dto: any) {
    try {
      const props = {
        giftId: dto.giftId,
        status: dto.status,
      };
      return await this.giftsService.changeGiftStatus(props);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

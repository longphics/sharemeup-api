import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(JwtGuard)
  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@GetUser() user: User) {
    return await this.usersService.getMe(user.id);
  }
}

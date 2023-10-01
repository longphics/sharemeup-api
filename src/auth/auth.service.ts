import {
  Injectable,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup({
    email,
    name,
    phone,
    address,
    password,
  }: {
    email: string;
    name: string;
    phone: string;
    address: string;
    password: string;
  }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new ConflictException('Email already exists');
    }

    const hash = await argon.hash(password);

    const newUserData: Prisma.UserCreateInput = {
      email,
      hash: hash,
      name,
      phone,
      address,
      avatar:
        'https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_3.jpg',
      background:
        'https://antimatter.vn/wp-content/uploads/2022/05/background-dep-1.jpg',
    };

    try {
      const user = await this.prisma.user.create({
        data: newUserData,
      });
      return await this._signToken(user.id, user.email);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw err;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    try {
      ////////////
      if (user.hash === dto.password) {
        return this._signToken(user.id, user.email);
      }

      const pwMatches = await argon.verify(user.hash, dto.password);
      if (!pwMatches) {
        throw new ForbiddenException('Credentials incorrect');
      }

      return this._signToken(user.id, user.email);
    } catch (err) {
      throw new ForbiddenException('Credentials incorrect');
    }
  }

  private async _signToken(userId: string, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret,
    });

    return {
      token: token,
    };
  }
}

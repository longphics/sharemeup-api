import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    const email = dto.email;
    const name = dto.name;
    const phone = dto.phone;
    const address = dto.address;
    const password = dto.password;
    return this.authService.signup({ email, name, phone, address, password });
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}

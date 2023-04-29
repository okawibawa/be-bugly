import { Controller, Get, Req, UseGuards, Body, Param } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async whoAmI(@Req() req: Request) {
    return req.user;
  }

  @Get(':id')
  async findUserById(@Param() userParams: { id: string }) {
    return this.userService.findUserByID(userParams);
  }
}

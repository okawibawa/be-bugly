import { Body, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInDto, UserSignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() userSignInDto: UserSignInDto) {
    return this.authService.signIn(userSignInDto);
  }

  @Post('sign-up')
  signUp(@Body() userSignUpDto: UserSignUpDto) {
    return this.authService.signUp(userSignUpDto);
  }
}

import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserSignInDto, UserSignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(userSignInDto: UserSignInDto) {
    const { email, password } = userSignInDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Password incorrect!');
    }

    return this.assignToken(user.email, user.username);
  }

  async signUp(userSignUpDto: UserSignUpDto) {
    const { username, email, password } = userSignUpDto;

    try {
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await this.prismaService.user.create({
        data: {
          username,
          email,
          password: passwordHash,
        },
      });

      return this.assignToken(newUser.email, newUser.username);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'User with the same email is already exist.',
          );
        }
      }

      throw error;
    }
  }

  async assignToken(email: string, username: string) {
    const payload = {
      sub: email,
      username,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '720m',
      secret: this.configService.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}

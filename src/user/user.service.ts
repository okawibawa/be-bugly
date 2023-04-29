import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findUserByID(userParams: { id: string }) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: +userParams.id,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    delete user.password;

    return user;
  }
}

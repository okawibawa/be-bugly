import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthCheckModule } from './health-check/health-check.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    HealthCheckModule,
    AuthModule,
    UserModule,
    ProjectModule,
  ],
})
export class AppModule {}

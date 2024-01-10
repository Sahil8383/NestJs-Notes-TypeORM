import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CacheModule.register({
      isGlobal: true,
    }),
    HttpModule,
  ],
  providers: [
    UsersService,
    {
      provide:APP_GUARD,
      useClass: ThrottlerModule,
    }
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

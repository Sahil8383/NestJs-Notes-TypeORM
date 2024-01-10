import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
      UsersModule,
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
        secret: 'secret',
        signOptions: { expiresIn: '1d' },
      }),
      HttpModule,
  ], 
  controllers: [AuthController],
  providers: [AuthService,UsersService,JwtStrategy]
})
export class AuthModule {}

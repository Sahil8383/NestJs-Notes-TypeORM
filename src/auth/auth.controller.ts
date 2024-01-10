import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly usersService: UsersService,
    ){}

    @Post('login')
    async login(@Body() createUserDto: CreateUserDto) {
        return await this.authService.login(createUserDto);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    // @UseGuards(JwtGuard)
    @Post('me')
    async me(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.findOneByEmail(createUserDto.email);
    }

}

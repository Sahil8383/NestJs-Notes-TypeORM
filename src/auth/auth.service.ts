import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}


    async login({ email, password }: any) {

        const user = await this.usersService.findOneByEmail(email);
        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { 
            sub: user.id,
            username: user.username,
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };

    }

    async register({ username, password }: any) {
        const payload = { username, password };
        return {
            payload
        };
    }

}

import { ClassSerializerInterceptor, Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Throttle } from '@nestjs/throttler';


@Controller('users')
@UseInterceptors(CacheInterceptor)
export class UsersController {
    constructor(
        private readonly usersSerive: UsersService
    )
    {}

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtGuard)
    @Throttle({
        default:{
            limit: 2,
            ttl: 60000
        }
    })
    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.usersSerive.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Get()
    async findAll() {
        return await this.usersSerive.findAll();
    }
}

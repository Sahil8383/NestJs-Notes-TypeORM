import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Note } from 'src/notes/entities/note.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly httpService: HttpService,
    ){}
    

    getAllUsers(): Observable<AxiosResponse> {
        return this.httpService.get('http://localhost:3000/notes');
    }

    async findAll(): Promise<User[]> {
        await this.cacheManager.set('test',{test: 1});
        const test = await this.cacheManager.get('test');
        console.log(test);
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: { id },
            relations: ['notes', 'notes.tags', 'notes.comments'],
        });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: { email }
        });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new User({
            ...createUserDto,
            notes: [],
        });
        return await this.userRepository.save(newUser);
    }
}

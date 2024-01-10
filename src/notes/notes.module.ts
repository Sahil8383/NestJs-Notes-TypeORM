import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tags.entity';
import { NotesSubscriber } from './notes.subscriber';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note,Comment,Tag,User]),
    HttpModule,
  ],
  controllers: [NotesController],
  providers: [NotesService, NotesSubscriber,UsersService],
})
export class NotesModule {}

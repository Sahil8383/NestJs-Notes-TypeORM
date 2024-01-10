import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository} from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tags.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NotesService {

  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    private readonly entityManager: EntityManager,
    private readonly usersService: UsersService,
  ){}

  async create(id: number , createNoteDto: CreateNoteDto) {

    const user = await this.usersService.findOne(id);

    const tags = createNoteDto.tags.map(tag => new Tag(tag));

    const note = new Note({
      ...createNoteDto,
      comments: [],
      tags,
      user,
    });
    return await this.entityManager.save(note);
  }

  async findAll() {
    return await this.noteRepository.find();
  }

  async findOne(id: number) {
    return await this.noteRepository.findOne({
      where: { id },
      relations: ['comments', 'tags', 'user'],
    })
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ['comments', 'tags'],
    });
    note.content = updateNoteDto.content;
    const comments = updateNoteDto.comments.map(comment => new Comment(comment));
    note.comments = comments; 
    return await this.entityManager.save(note);
    // return await this.entityManager.transaction(async (entityManager) => {
    //   const note = await this.noteRepository.findOne({
    //     where: { id },
    //     relations: ['comments'],
    //   });
    //   note.content = updateNoteDto.content;
    //   const comments = updateNoteDto.comments.map(comment => new Comment(comment));
    //   note.comments = comments; 
    //   await entityManager.save(note);

    //   // throw new Error('Error in transaction'); // To Demonstrate Rollback

    //   const tagContent = `tag-${id}`;
    //   const tag = new Tag({ content: tagContent });
    //   await entityManager.save(tag);
    // });
  }

  async remove(id: number) {
    return await this.noteRepository.delete(id);
  }
}

import { Note } from "src/notes/entities/note.entity";

export class CreateUserDto {
    username: string;
    email: string;
    password: string;
    notes: Note[];
}
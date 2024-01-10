import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Note } from "./note.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => Note, note => note.comments)
    @JoinColumn()
    note: Note;

    constructor(comment: Partial<Comment>) {
        Object.assign(this, comment)
    }
}
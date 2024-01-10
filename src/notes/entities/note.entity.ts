import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { Tag } from "./tags.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @OneToMany(() => Comment, comment => comment.note, { cascade: true })
    @JoinColumn()
    comments: Comment[];

    @ManyToMany(() => Tag, { cascade: true})
    @JoinTable()
    tags: Tag[];

    @ManyToOne(() => User, user => user.notes)
    @JoinColumn()
    user: User;

    constructor(note: Partial<Note>) {
        Object.assign(this, note)
    }
}

import { Note } from "src/notes/entities/note.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({unique: true})
    email: string;

    @Exclude()
    @Column()
    password: string;

    @OneToMany(() => Note, note => note.user)
    @JoinColumn()
    notes: Note[];

    constructor(user: Partial<User>) {
        Object.assign(this, user)
    }
}
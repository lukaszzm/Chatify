import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Length } from "class-validator";
import { Note } from "../notes/note.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  @Length(8)
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  profileImage: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}

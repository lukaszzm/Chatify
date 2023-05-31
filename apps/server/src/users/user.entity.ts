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

  @Column({
    default:
      "https://firebasestorage.googleapis.com/v0/b/chatify-ccec7.appspot.com/o/blank.png?alt=media&token=3c15a358-7573-4644-b939-cc9fa9c444d1",
  })
  profileImage: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}

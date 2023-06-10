import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Note } from "../notes/note.entity";
import { Message } from "../messages/message.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fullName: string;

  @Column({
    default: process.env.DEFAULT_PROFILE_IMAGE_URL,
  })
  profileImage: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @OneToMany(() => Message, (message) => message.from)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.to)
  receivedMessages: Message[];
}

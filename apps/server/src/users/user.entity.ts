import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Note } from "../notes/note.entity";
import { Message } from "../messages/message.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({})
  fullName: string;

  @Column({
    default:
      "https://firebasestorage.googleapis.com/v0/b/chatify-ccec7.appspot.com/o/blank.png?alt=media&token=3c15a358-7573-4644-b939-cc9fa9c444d1",
  })
  profileImage: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @OneToMany(() => Message, (message) => message.from)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.to)
  receivedMessages: Message[];
}

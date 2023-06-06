import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column()
  createdAt: string;

  @ManyToOne(() => User, (user) => user.sentMessages)
  from: User;

  @OneToMany(() => User, (user) => user.receivedMessages)
  to: User;
}

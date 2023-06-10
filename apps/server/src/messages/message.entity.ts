import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (sender) => sender.sentMessages)
  @JoinColumn({ name: "fromId" })
  from: User;

  @ManyToOne(() => User, (receiver) => receiver.receivedMessages)
  @JoinColumn({ name: "toId" })
  to: User;
}

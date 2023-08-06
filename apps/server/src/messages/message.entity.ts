import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 250,
  })
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  fromId: string;

  @ManyToOne(() => User, (sender) => sender.sentMessages)
  @JoinColumn()
  from: User;

  @Column({ nullable: true })
  toId: string;

  @ManyToOne(() => User, (receiver) => receiver.receivedMessages)
  @JoinColumn()
  to: User;
}

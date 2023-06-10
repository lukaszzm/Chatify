import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: "userId" })
  user: User;
}

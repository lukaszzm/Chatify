import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  createdAt: string;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;
}

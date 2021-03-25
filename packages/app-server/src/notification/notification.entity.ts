import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "../user/user.entity";
import { ACTIONS } from "../@config/actions.config";
import {Actions} from "../@types/index.types";

@Entity()
@Index(["userId"])
export class Notification extends BaseEntity {

  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ name: "user_id" })
  userId: string;

  @ManyToOne(
    () => User,
    (user: User) => user.notifications,
    { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id", referencedColumnName: "userId" })
  user: User;

  @Column({ default: ACTIONS.EMAIL_VERIFY_EMAIL })
  action: Actions;

  @Column({ default: "" })
  subject: string;

  @Column({ default: "" })
  message: string;

  @Column({ default: "" })
  context: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  read: boolean;
}

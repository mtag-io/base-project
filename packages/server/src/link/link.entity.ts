import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { ACTIONS } from "../@config/actions.config";
import { nanoid } from "nanoid/async";
import {Actions} from "../@types/index.types";

@Entity()
export class Link extends BaseEntity {

  @PrimaryGeneratedColumn()
  _id: number;

  @ManyToOne(
    () => User,
    (user: User) => user.links,
    {onDelete: 'CASCADE'}
  )
  @JoinColumn({name: 'user_id',  referencedColumnName: "userId" })
  user: User;

  @Column({name: 'user_id'})
  userId: string;

  @Column({ default: null })
  hash: string;

  @Column({ default: ACTIONS['EMAIL_VERIFY_EMAIL'] })
  action: Actions;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expire: Date;

  @Column({ default: true })
  valid: Boolean;

  isExpired(): Boolean {
    return Math.floor(Date.now() / 1000) > this.expire.getTime();
  }

  async generateHash(): Promise<string> {
    this.hash = await nanoid(10);
    return this.hash;
  }
}
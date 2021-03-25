import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";
import { DEFAULT_LANG } from "../@config/server.config";

@Entity()
@Unique(["userId"])
export class Profile extends BaseEntity {

  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ name: "user_id" })
  userId: string;

  @OneToOne(
    () => User,
    (user: User) => user.profile,
    { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id", referencedColumnName: "userId" })
  public user: User;

  @Column({type: "longtext"})
  avatar: string;

  @Column({ default: "" })
  fullName: string;

  @Column({ default: DEFAULT_LANG })
  lang: string;
}
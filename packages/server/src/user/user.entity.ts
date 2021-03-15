import * as bcrypt from "bcrypt";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from "typeorm";
import {APP_OPEN_AUTH, ROLES} from "../auth/auth.config";
import {Link} from "../link/link.entity";
import {Notification} from "../notification/notification.entity";
import {Profile} from "./profile.entity";
import {Roles} from "../@types/index.types";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    _id: number;

    @Index()
    @Column({default: ""})
    userId: string;

    @Column()
    email: string;

    @Column({default: false})
    verified: boolean;

    @Column({default: APP_OPEN_AUTH})
    active: boolean;

    @Column({default: ROLES.ANONYMOUS})
    role: Roles;

    @Column({select: false})
    password: string;

    @Column({select: false})
    salt: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    lastLogin: Date;

    @Column({default: null, select: false})
    refreshHash: string;

    @Column()
    refreshExp: Date

    @OneToMany(
        () => Link,
        (link: Link) => link.user,
        {onDelete: "CASCADE"})
    links: Link[];

    @OneToMany(
        () => Notification,
        (notification: Notification) => notification.user,
        {onDelete: "CASCADE"})
    notifications: Notification[];

    @OneToOne(
        () => Profile,
        (profile: Profile) => profile.user,
        {onDelete: "CASCADE"}
    )
    profile: Profile;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

    async hashPassword(password: string): Promise<void> {
        this.salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(password, this.salt);
    }

    refreshExpired(){
        return (Date.now() - this.refreshExp.getMilliseconds()) > 0
    }
}
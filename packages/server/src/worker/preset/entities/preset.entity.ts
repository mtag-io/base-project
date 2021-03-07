import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity()
@Unique(["name"])
export class Preset extends BaseEntity {

    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    name: string;

    @Column({type: "json"})
    data: string;
}

import { Exclude } from "class-transformer";
import { Entity as TYPEORM_ENTITY, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Entity from "./Entity";

import User from "./User";






enum Rate {
    GOOD = "low",
    VGOOD = "medium",
    Excellent = "high",
}

@TYPEORM_ENTITY("repo")
export default class Repo extends Entity {
    constructor(repo: Partial<Repo>) {
        super();
        Object.assign(this, repo);
    }
    @Index()
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    repoName: string;
    @Column()
    repoDescription: string;
    @Column()
    author: string;
    @Column({
        type: "enum",
        default: "medium",
        enum: Rate,
    })
    rate: Rate;




}

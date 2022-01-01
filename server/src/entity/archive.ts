import { Exclude } from "class-transformer";
import {  Entity as TYPEORM_ENTITY, PrimaryGeneratedColumn,   Column, Index, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Entity from "./Entity";

import Stations from "./stations";

import TypeOfDoc from "./typedocument";
import TypeOfsurvey from "./typeofsurvey";
import User from "./User";


@TYPEORM_ENTITY("archive")
export default class Archive extends Entity {
constructor(archive :Partial<Archive>){
    super();
    Object.assign(this,archive);
}
@Index()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serialno: string;


    @ManyToOne(() => Stations, (station) => station.archive, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      @JoinColumn({ name: "stationId", referencedColumnName: "station_ID" })
      station: Stations;


    @ManyToOne(() => TypeOfsurvey, (typeofsurvey) => typeofsurvey.typeofsurvey, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn()
    typeofsurvey: TypeOfsurvey;

    

}

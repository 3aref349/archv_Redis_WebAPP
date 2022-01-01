import {
    Entity as TYPEORM_ENTITY, PrimaryGeneratedColumn, Column, Index, JoinColumn,
    ManyToOne, CreateDateColumn,
    UpdateDateColumn, OneToMany, OneToOne,
  } from "typeorm";
import Archive from "./archive";
import Entity from "./Entity";


@TYPEORM_ENTITY("stations")
export default class Stations  {

constructor(station :Partial<Stations>){

    Object.assign(this,station);
}
// @Index()
// @PrimaryGeneratedColumn()
// id: number;
    @Index()
     @Column({nullable:false,primary:true})
   // @Column({nullable:true})
station_ID:string;
  
@Column({nullable:true})
    station_name: string;
    @Column({nullable:true})
    company_name: string;
    @Column({nullable:true})
    Governorate: string;
    @Column({nullable:true})
    Center: string;

    @OneToMany(() => Archive, (archive) => archive.station, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
    archive: Archive[];

    // @OneToMany(() => Comment, (comment) => comment.blogpost)
    // comments: Comment[];

}

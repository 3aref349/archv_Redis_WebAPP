import {  Entity as TYPEORM_ENTITY, PrimaryGeneratedColumn,   Column, Index, OneToMany } from "typeorm";
import Archive from "./archive";
import Entity from "./Entity";



@TYPEORM_ENTITY("typeofsurvey")
export default class TypeOfsurvey extends Entity {
constructor(typeofsurvey :Partial<TypeOfsurvey>){
    super();
    Object.assign(this,typeofsurvey);
}
@Index()
    @PrimaryGeneratedColumn()
    id: number;
    @Index()
    @Column()
    surveyName: string;
 
    @OneToMany(() => Archive, (archive) => archive.typeofsurvey, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      typeofsurvey: TypeOfsurvey;
  

    // @OneToMany(() => Comment, (comment) => comment.blogpost)
    // comments: Comment[];

}

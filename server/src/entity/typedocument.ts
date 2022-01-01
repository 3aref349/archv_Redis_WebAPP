import {  Entity as TYPEORM_ENTITY, PrimaryGeneratedColumn,   Column, Index, OneToMany } from "typeorm";
import Archive from "./archive";
import Entity from "./Entity";
import TypeOfsurvey from "./typeofsurvey";


@TYPEORM_ENTITY("typedocument")
export default class TypeOfDoc extends Entity {
constructor(typedoc :Partial<TypeOfDoc>){
    super();
    Object.assign(this,typedoc);
}
@Index()
    @PrimaryGeneratedColumn()
    id: number;
    @Index()
    @Column()
    docName: string;
 
    // @OneToMany(() => Archive, (archive) => archive.typedoc, {
    //     onUpdate: "CASCADE",
    //     onDelete: "CASCADE",
    //   })
    //   typedoc: TypeOfDoc;

  

    // @OneToMany(() => Comment, (comment) => comment.blogpost)
    // comments: Comment[];

}

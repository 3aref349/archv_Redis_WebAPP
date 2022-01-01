// import { Exclude } from "class-transformer";
// import {  Entity as TYPEORM_ENTITY, PrimaryGeneratedColumn,   Column, Index, ManyToOne, JoinColumn } from "typeorm";
// import Archive from "./archive";
// import Entity from "./Entity";
// import User from "./User";


// @TYPEORM_ENTITY("serialno")
// export default class SerialNumber extends Entity {
// constructor(serialno :Partial<SerialNumber>){
//     super();
//     Object.assign(this,serialno);
// }
// @Index()
//     @PrimaryGeneratedColumn()
//     id: number;
//     @Index()
//     @Column()
//     serialno: number;
 

  


//     @Exclude()
//     @ManyToOne(() => Archive, (archive) => archive.archive, {
//         onUpdate: "CASCADE",
//         onDelete: "CASCADE",
//     })
//     @JoinColumn()
//     archive: Archive;

//     // @OneToMany(() => Comment, (comment) => comment.blogpost)
//     // comments: Comment[];

//     @ManyToOne(() => User, (user) => user.serialno, {
//         onUpdate: "CASCADE",
//         onDelete: "CASCADE",
//       })
//       @JoinColumn({ name: "username", referencedColumnName: "username" })
//       user: User;
// }

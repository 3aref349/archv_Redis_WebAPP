import {
  Entity as TYPEORM_ENTITY,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import Entity from "./Entity";






@TYPEORM_ENTITY("users")
export default class User extends Entity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  @Length(3, 255, {
    message: "Name must be more than  Or Equal to 3 charachter ",
  })
  @IsNotEmpty({ message: "must be filled" })
  username: string;

  @Index()
  @IsEmail({}, { message: "  Email is not correct " })
  @Column({ unique: true })
  email: string;
  
  @Index()
  @Column({ default: "default.jpg" })
  imageUrn: string;


  @Index()
  @Column()
  location: string;

 





  


  
}

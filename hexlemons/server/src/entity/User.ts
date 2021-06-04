import { Field, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity('users')
export class User extends BaseEntity{

    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String)
    @Column({unique: true})
    email: string;

    @Field(() => String)
    @Column({unique: true})
    phone: string;

    @Field(() => String)
    @Column()
    password: string;

    @Field(() => Number)
    @Column('int', {default: 0})
    tokenVersion: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

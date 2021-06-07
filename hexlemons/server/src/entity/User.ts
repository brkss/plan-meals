import { Field, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany} from "typeorm";
import { Bowl } from "./Bowl";
import { BowlElement } from "./BowlElement";

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
    username: string;

    @Field(() => String)
    @Column()
    password: string;

    @Field(() => Number)
    @Column('int', {default: 0})
    tokenVersion: number;

    @Field(() => Date)
    @CreateDateColumn()
    created_at: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updated_at: Date;

    // relations
    @Field(() => Bowl)
    @OneToMany(() => Bowl, bowls => bowls.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    bowls: Bowl[]

    @Field(() => [BowlElement])
    @OneToMany(() => BowlElement, element => element.category, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    bowlElements: BowlElement[];

}

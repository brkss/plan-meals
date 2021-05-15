import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    username: string;

    @Column('text')
    password: string;

    @Column('int', {default: 0})
    tokenVersion: number;

    @OneToMany(_ => Recipe, recipe => recipe.user, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    recipes: Recipe[];

}

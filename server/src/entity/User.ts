import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Day } from "./Day";
import { Grocery } from "./Grocery";
import { Recipe } from "./Recipe";

@Entity('users')
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

    @OneToMany(_ => Grocery, grocery => grocery.user, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    groceries: Grocery[];

    @OneToMany(_ => Day, day => day.user, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    days: Day[];

}

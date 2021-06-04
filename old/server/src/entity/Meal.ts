import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Day } from './Day';
import { Recipe } from './Recipe';

@Entity('meals')
export class Meal extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('boolean', {default: false})
    finish: boolean;

    @Column('text', {nullable: true})
    time?: string;

    @ManyToOne(_ => Day, day => day.meals, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    day: Day; 

    @ManyToMany(() => Recipe, recipe => recipe.meals)
    recipes: Recipe[];

}
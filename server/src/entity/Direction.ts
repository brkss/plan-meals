import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Recipe } from './Recipe';

@Entity()
export class Direction extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    text: string;

    @ManyToOne(_ => Recipe, recipe => recipe.directions, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    recipe: Recipe;



}
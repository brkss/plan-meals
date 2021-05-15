import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
export class Url extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToOne(_ => Recipe, recipe => recipe.urls, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    recipe: Recipe; 

}
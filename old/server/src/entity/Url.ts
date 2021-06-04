import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Recipe } from './Recipe';

@Entity('urls')
export class Url extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    link: string;

    @ManyToOne(_ => Recipe, recipe => recipe.urls, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    recipe: Recipe; 

}
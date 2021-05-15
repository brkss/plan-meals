import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Grocery } from './Grocery';
import { Recipe } from './Recipe';


@Entity('ingredients')
export class Ingredient extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    measurement: string;

    @Column()
    calories: number;

    @ManyToOne(_ => Recipe, recipe => recipe.ingredients, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    recipe: Recipe;
    
    @ManyToOne(_ => Grocery, grocery => grocery.ingredients, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    grocery: Grocery;

}
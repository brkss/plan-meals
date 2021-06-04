import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Grocery } from './Grocery';
import { Recipe } from './Recipe';


@Entity('ingredients')
export class Ingredient extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    measurement: string;

    @Column({nullable: true})
    name?: string;

    @Column({default: 0})
    calories: number;

    @ManyToOne(_ => Recipe, recipe => recipe.ingredients, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    recipe: Recipe;
    
    @ManyToOne(_ => Grocery, grocery => grocery.ingredients, {onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true})
    grocery?: Grocery;

}
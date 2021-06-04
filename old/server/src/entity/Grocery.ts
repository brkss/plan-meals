import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { GroceryCategory } from './GroceryCategory';
import { Ingredient } from './Ingredient';
import { User } from './User';

@Entity('groceries')
export class Grocery extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('boolean', {default: false})
    available?: boolean

    @Column('double', {default: 0})
    price?: number
    

    @ManyToOne(_ => User, user => user.groceries, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User;

    @ManyToOne(_ => GroceryCategory, category => category.groceries, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    category: GroceryCategory;

    @OneToMany(_ => Ingredient, ingredient => ingredient.recipe, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    ingredients: Ingredient[]
}
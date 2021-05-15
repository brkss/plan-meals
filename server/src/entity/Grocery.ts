import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Ingredient } from './Ingredient';
import { User } from './User';

@Entity('groceries')
export class Grocery extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('boolean')
    available: boolean
    

    @ManyToOne(_ => User, user => user.groceries, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User;

    @OneToMany(_ => Ingredient, direction => direction.recipe, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    ingredients: Ingredient[]
}
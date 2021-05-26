import { BaseEntity, Entity, Column,  PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { Direction } from './Direction';
import { Ingredient } from './Ingredient';
import { Meal } from './Meal';
import { Url } from './Url';
import { User } from './User';



@Entity('recipes')
export class Recipe extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title : string;

    @Column('text')
    description: string;

    @Column('text')
    tags: string;

    @Column('boolean')
    public: boolean;

    @Column({nullable: true})
    image?: string; 

    @ManyToOne(_ => User, user => user.recipes, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User; 

    @OneToMany(_ => Url, url => url.recipe, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    urls: Url[];

    @OneToMany(_ => Direction, direction => direction.recipe, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    directions: Direction[]

    @OneToMany(_ => Ingredient, direction => direction.recipe, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    ingredients: Ingredient[]

    @ManyToMany(() => Meal, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinTable()
    meals: Meal[];
    

}
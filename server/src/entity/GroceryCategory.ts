import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Grocery } from './Grocery';


@Entity()
export class GroceryCategory extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(_ => Grocery, grocery => grocery.category, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    groceries: Grocery[]

}
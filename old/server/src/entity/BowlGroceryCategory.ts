import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BowlGrocery } from './BowlGrocery';

@Entity()
export class BowlGroceryCategory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(() => BowlGrocery, bowlgrocery => bowlgrocery.category)
    bowlgroceries: BowlGroceryCategory[];

}
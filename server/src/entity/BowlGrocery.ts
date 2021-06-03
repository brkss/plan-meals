import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BowlGroceryCategory } from './BowlGroceryCategory';


@Entity()
export class BowlGrocery extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    image: string;

    @Column()
    cals: number;

    @ManyToOne(() => BowlGroceryCategory, category => category.bowlgroceries)
    category: BowlGroceryCategory;

}
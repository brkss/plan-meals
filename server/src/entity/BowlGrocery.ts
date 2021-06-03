import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Bowl } from './Bowl';
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

    @ManyToMany(() => Bowl, bowl => bowl.elements, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinTable()
    bowls: Bowl[]
    
    @ManyToOne(() => BowlGroceryCategory, category => category.bowlgroceries)
    category: BowlGroceryCategory;


}
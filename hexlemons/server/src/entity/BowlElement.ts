import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BowlElementCategory } from './BowlElementCategories';

@Entity('bowl_elements')
export class BowlElement extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({default: 0})
    calories: number;

    @ManyToOne(() => BowlElementCategory, category => category.elements, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    category: BowlElementCategory;

}
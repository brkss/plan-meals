import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bowl } from './Bowl';
import { BowlElementCategory } from './BowlElementCategories';
import { User } from './User';

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

    @ManyToOne(() => User, user => user.bowlElements, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User[];

    @ManyToMany(() => Bowl)
    bowls : Bowl[]
    
}
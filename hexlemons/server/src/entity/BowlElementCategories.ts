import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BowlElement } from './BowlElement';

@Entity()
export class BowlElementCategory extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(() => BowlElement, element => element.category, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    elements: BowlElement[];
} 

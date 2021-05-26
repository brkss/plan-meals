import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Day } from './Day';

@Entity('meals')
export class Meal extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('boolean', {default: false})
    finish: boolean;

    @Column('text', {nullable: true})
    time?: string;

    @ManyToOne(_ => Day, day => day.meals, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    day: Day; 

}
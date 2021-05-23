import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Meal } from './Meal';
import { User } from './User';

@Entity('days')
export class Day extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('boolean')
    finish: boolean;

    @Column('datetime')
    date: Date;

    @ManyToOne(_ => User, user => user.days, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User; 

    @OneToMany(_ => Meal, meal => meal.day, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    meals: Meal[];


}
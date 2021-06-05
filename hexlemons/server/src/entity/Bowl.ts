import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BowlElement } from './BowlElement';
import { User } from './User';


@Entity('bowls')
export class Bowl extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    ticket: string;

    @ManyToOne(() => User, user => user.bowls, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User;
    
    @ManyToMany(() => BowlElement)
    @JoinTable()
    elements : BowlElement[]
    

} 
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { BowlGrocery } from './BowlGrocery';
import { User } from './User';


@Entity()
export class Bowl extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    ticket: string;

    @Column()
    time: string;

    @ManyToOne(() => User, user => user.bowls)
    user: User;

    @ManyToMany(() => BowlGrocery, element => element.bowls, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    elements: BowlGrocery[];

}
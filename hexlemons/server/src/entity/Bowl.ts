import { Field, ObjectType } from 'type-graphql';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BowlElement } from './BowlElement';
import { User } from './User';

@ObjectType()
@Entity('bowls')
export class Bowl extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    ticket: string;

    @Field(() => User)
    @ManyToOne(() => User, user => user.bowls, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User;
    
    @Field(() => [BowlElement])
    @ManyToMany(() => BowlElement)
    @JoinTable()
    elements : BowlElement[]
    

} 
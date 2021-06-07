import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BowlElement } from './BowlElement';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class BowlElementCategory extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    description: string;

    @Field(() => [BowlElement])
    @OneToMany(() => BowlElement, element => element.category, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    elements: BowlElement[];

   
} 

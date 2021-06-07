import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity,  ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bowl } from './Bowl';
import { BowlElementCategory } from './BowlElementCategories';
import { User } from './User';

@ObjectType()
@Entity('bowl_elements')
export class BowlElement extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column({nullable: true})
    image: string;

    @Field()
    @Column({default: 0})
    calories: number;

    @Field(() => BowlElementCategory)
    @ManyToOne(() => BowlElementCategory, category => category.elements, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    category: BowlElementCategory;

    @Field(() => User)
    @ManyToOne(() => User, user => user.bowlElements, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User;

    @Field(() => Bowl)
    @ManyToMany(() => Bowl)
    bowls : Bowl[];
    
}
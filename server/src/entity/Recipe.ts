import { BaseEntity, Entity, Column,  PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { Direction } from './Direction';
import { Url } from './Url';
import { User } from './User';



@Entity()
export class Recipe extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title : string;

    @Column('text')
    description: string;

    @Column('text')
    tags: string;

    @Column('boolean')
    public: boolean;

    @ManyToOne(_ => User, user => user.recipes, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User; 

    @OneToMany(_ => Url, url => url.recipe, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    urls: Url[];

    @OneToMany(_ => Direction, direction => direction.recipe, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    directions: Direction[]

}
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';


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

}
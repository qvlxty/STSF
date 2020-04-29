import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class guestBook {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    author: number;

    @Column({
        type: 'text',
        nullable: false
    })
    text: string;
}
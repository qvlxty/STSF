import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    login: string;

    @Column({
        type: 'varchar'
    })
    password: string;

}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ orderBy: { email: 'ASC' } })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column('date', { nullable: true })
    birthday: Date;
}

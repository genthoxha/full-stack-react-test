import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ type: 'text' })
    homeLatitude: string;

    @Column({ type: 'text' })
    homeLongitude: string;

    @Column({ type: 'text' })
    currentLatitude: string;

    @Column({ type: 'text' })
    currentLongitude: string;
}

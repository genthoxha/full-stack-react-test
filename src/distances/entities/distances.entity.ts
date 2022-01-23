import { PrimaryGeneratedColumn } from 'typeorm';
import { Column, Entity, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { UserDistances } from '../../user-distances/entities/user-distances.entity';

@Entity()
export class Distance {

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  value: number;

  @OneToMany(
    () => UserDistances,
    userDistance => userDistance.distance,
    { cascade: true },
  )
  userDistances: UserDistances[];
}

import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Distance } from '../../distances/entities/distances.entity';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class UserDistances {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Distance)
  distance: Distance;

  @ManyToOne(() => Users)
  user: Users;
}

import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Distance } from '@app/distances/entities/distances.entity';
import { Users } from '@app/users/entities/users.entity';
import { Column } from 'typeorm/index';

@Entity()
export class UserDistances {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Distance)
  distance: Distance;

  @ManyToOne(() => Users)
  user: Users;

  @Column({ type: 'int'})
  checkpointId: string;
}

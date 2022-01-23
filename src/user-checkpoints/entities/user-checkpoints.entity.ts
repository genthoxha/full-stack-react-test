import { Users } from '@app/users/entities/users.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm/index';
import { Checkpoint } from '@app/checkpoints/entities/checkpoint.entity';

@Entity()
export class UserCheckpoints {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Checkpoint)
  checkpoint: Checkpoint;

  @ManyToOne(() => Users)
  user: Users;
}

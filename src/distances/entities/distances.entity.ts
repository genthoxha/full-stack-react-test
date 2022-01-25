import { PrimaryGeneratedColumn } from 'typeorm';
import { Column, Entity } from 'typeorm';

@Entity()
export class Distance {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'numeric', precision: 10, scale: 5})
  value: number;

}



import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Checkpoint {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'text' })
  latitude: string;

  @Column({ type: 'text' })
  longitude: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { Checkpoint } from '../entities/checkpoint.entity';

@Injectable()
export class CheckpointsService {
  constructor(
    @InjectRepository(Checkpoint)
    private checkpointRepository: Repository<Checkpoint>
  ){}

  findAll(): Promise<Checkpoint[]> {
    return this.checkpointRepository.find();
  }

  findOne(id: string): Promise<Checkpoint> {
    return this.checkpointRepository.findOne(id);
  }

  createCheckpoint(checkpoint: Checkpoint): Promise<Checkpoint> {
    return this.checkpointRepository.save(checkpoint);
  }
}

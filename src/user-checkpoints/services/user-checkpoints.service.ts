import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { UserCheckpoints } from '@app/user-checkpoints/entities/user-checkpoints.entity';

@Injectable()
export class UserCheckpointsService {
  constructor(
    @InjectRepository(UserCheckpoints)
    private userCheckpointRepository: Repository<UserCheckpoints>
  ){}

  findAll(): Promise<UserCheckpoints[]> {
    return this.userCheckpointRepository.find();
  }

  findOne(id: string): Promise<UserCheckpoints> {
    return this.userCheckpointRepository.findOne(id);
  }

  createUserCheckpoint(userCheckpoint: UserCheckpoints): Promise<UserCheckpoints> {
    return this.userCheckpointRepository.save(userCheckpoint);
  }
}

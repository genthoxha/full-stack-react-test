import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { UserCheckpoints } from '@app/user-checkpoints/entities/user-checkpoints.entity';
import { UsersService } from '@app/users/services/users.service';
import { CheckpointsService } from '@app/checkpoints/services/checkpoints.service';
import { Users } from '@app/users/entities/users.entity';
import { Checkpoint } from '@app/checkpoints/entities/checkpoint.entity';

@Injectable()
export class UserCheckpointsService {
  constructor(
    @InjectRepository(UserCheckpoints)
    private userCheckpointRepository: Repository<UserCheckpoints>,
    private usersService: UsersService,
    private checkPointService: CheckpointsService,
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

  async addCheckpointsToUsers() {
    const users: Users[] = await this.usersService.findAll();
    const checkpoints: Checkpoint[] = await this.checkPointService.findAll();
    return checkpoints.map(checkpoint => {
      users.map((user) => {
        this.userCheckpointRepository.save({
          user,
          checkpoint
        })
      })
    });
  }
}

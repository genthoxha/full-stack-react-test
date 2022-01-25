import { Module } from '@nestjs/common';
import { UserCheckpointsService } from '@app/user-checkpoints/services/user-checkpoints.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@app/users/entities/users.entity';
import { Checkpoint } from '@app/checkpoints/entities/checkpoint.entity';
import { UserCheckpoints } from '@app/user-checkpoints/entities/user-checkpoints.entity';
import { UserCheckpointsController } from '@app/user-checkpoints/controllers/user-checkpoints.controller';
import { UsersService } from '@app/users/services/users.service';
import { CheckpointsService } from '@app/checkpoints/services/checkpoints.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserCheckpoints, Users, Checkpoint])],
  controllers: [UserCheckpointsController],
  providers: [UserCheckpointsService, UsersService, CheckpointsService]
})
export class UserCheckpointsModule {}

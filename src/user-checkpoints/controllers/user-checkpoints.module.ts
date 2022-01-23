import { Module } from '@nestjs/common';
import { UserCheckpointsController } from '@app/user-checkpoints/user-checkpoints.controller';
import { UserCheckpointsService } from '@app/user-checkpoints/services/user-checkpoints.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@app/users/entities/users.entity';
import { Checkpoint } from '@app/checkpoints/entities/checkpoint.entity';
import { UserCheckpoints } from '@app/user-checkpoints/entities/user-checkpoints.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserCheckpoints, Users, Checkpoint])],
  controllers: [UserCheckpointsController],
  providers: [UserCheckpointsService]
})
export class UserCheckpointsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDistances } from './entities/user-distances.entity';
import { UserDistancesService } from './services/user-distances.service';
import { UserDistancesController } from './controllers/user-distances.controller';
import { Users } from '@app/users/entities/users.entity';
import { Distance } from '@app/distances/entities/distances.entity';
import { UsersService } from '@app/users/services/users.service';
import { DistancesService } from '@app/distances/services/distances.service';
import { Checkpoint } from '@app/checkpoints/entities/checkpoint.entity';
import { CheckpointsService } from '@app/checkpoints/services/checkpoints.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserDistances, Users, Distance, Checkpoint])],
  controllers: [UserDistancesController],
  providers: [UserDistancesService, UsersService, DistancesService, CheckpointsService]
})
export class UserDistancesModule {}

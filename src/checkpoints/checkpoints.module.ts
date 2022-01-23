import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkpoint } from './entities/checkpoint.entity';
import { CheckpointsController } from './controllers/checkpoints.controller';
import { CheckpointsService } from './services/checkpoints.service';

@Module({
  imports: [TypeOrmModule.forFeature([Checkpoint])],
  controllers: [CheckpointsController],
  providers: [CheckpointsService]
})
export class CheckpointsModule {}

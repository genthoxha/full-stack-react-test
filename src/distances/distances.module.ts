import { Module } from '@nestjs/common';
import { DistancesService } from './services/distances.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distance } from './entities/distances.entity';
import { DistancesController } from './controllers/distances.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Distance])],
  controllers: [DistancesController],
  providers: [DistancesService]
})
export class DistancesModule {}

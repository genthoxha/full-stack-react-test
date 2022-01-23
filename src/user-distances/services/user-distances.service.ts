import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../users/entities/users.entity';
import { Repository } from 'typeorm/index';
import { UserDistances } from '../entities/user-distances.entity';
import { UsersService } from '@app/users/services/users.service';
import { DistancesService } from '@app/distances/services/distances.service';
import { CheckpointsService } from '@app/checkpoints/services/checkpoints.service';
import { Checkpoint } from '@app/checkpoints/entities/checkpoint.entity';
import { Distance } from '@app/distances/entities/distances.entity';
const haversine = require("haversine-distance");

enum CalculateDistance {
  METERS,
  KM
}

@Injectable()
export class UserDistancesService {
  constructor(
    @InjectRepository(UserDistances)
    private userDistanceRepository: Repository<UserDistances>,
    private userService: UsersService,
    private distanceService: DistancesService,
    private checkPointService: CheckpointsService
  ){}

  async findAll(): Promise<UserDistances[]> {
    const users: Users[] = await this.userService.findAll();
    const checkPoints: Checkpoint[] = await this.checkPointService.findAll();
    const distances: Distance[] = [];
    users.map(u => {
      if (u.currentLatitude === u.homeLatitude && u.currentLongitude === u.homeLongitude) {
        const home = u.homeLatitude + u.homeLongitude;
        const checkpoint = checkPoints[0].latitude + checkPoints[0].longitude;
        const distance = this.calculateDistanceBetweenTwoCoordinates(CalculateDistance.KM, home, checkpoint);

      }
    })

    return this.userDistanceRepository.find();
  }

  findOne(id: string): Promise<UserDistances> {
    return this.userDistanceRepository.findOne(id);
  }

  createUserDistance(userDistance: UserDistances): Promise<UserDistances> {
    return this.userDistanceRepository.save(userDistance);
  }


  calculateDistanceBetweenTwoCoordinates(type: CalculateDistance, cord1, cord2){
    const resultInMeters = haversine(cord1, cord2);
    return type === CalculateDistance.METERS ? resultInMeters : resultInMeters / 1000;
  }
}

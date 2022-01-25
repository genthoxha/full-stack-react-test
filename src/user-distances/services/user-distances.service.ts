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

enum CalculateDistance {
  METERS,
  KM,
}

@Injectable()
export class UserDistancesService {
  constructor(
    @InjectRepository(UserDistances)
    private userDistanceRepository: Repository<UserDistances>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private userService: UsersService,
    private distanceService: DistancesService,
    private checkPointService: CheckpointsService,
  ) {}

  async findAll(): Promise<UserDistances[]> {
    return this.userDistanceRepository.find();
  }

  findOne(id: string): Promise<UserDistances> {
    return this.userDistanceRepository.findOne(id);
  }

  async calculateDistancesPerUser() {
    const users: Users[] = await this.userService.findAll();
    const checkPoints: Checkpoint[] = await this.checkPointService.findAll();
    return checkPoints.map((checkpoint) => {
      users.map(async (user) => {
        const currentUserPosition = {
          latitude: user.currentLatitude,
          longitude: user.currentLongitude,
        };
        const userHomePosition = {
          latitude: user.homeLatitude,
          longitude: user.homeLongitude,
        };
        const distanceFromUserToHome = this.distance(
          currentUserPosition.latitude,
          currentUserPosition.longitude,
          userHomePosition.latitude,
          userHomePosition.longitude
        );
        const checkpointPosition = {
          latitude: checkpoint.latitude,
          longitude: checkpoint.longitude,
        };
        const distanceFromHomeToCheckpoint = this.distance(
          userHomePosition.latitude,
          userHomePosition.longitude,
          checkpointPosition.latitude,
          checkpointPosition.longitude
        );
        const partialDistance: Partial<Distance> = {
          value: 2 * (distanceFromUserToHome + distanceFromHomeToCheckpoint),
        };
        const distance = await this.distanceService.createDistance(
          partialDistance,
        );
        await this.createUserDistance({
          distance,
          user,
        });

        await this.getUserRankingByCheckpointId(1);
      });
    });
  }

  async getUserRankingByCheckpointId(id) {
 /*   let result = this.userDistanceRepository
      .createQueryBuilder("userDistances")
      .innerJoinAndSelect("userDistances.user", "user")
      .innerJoin("userDistances.user.checkpoint", "userCheckpoint")
      .where("userCheckpoint.id =:id", { id });
*/

  }
  createUserDistance(
    userDistance: Partial<UserDistances>,
  ): Promise<UserDistances> {
    return this.userDistanceRepository.save(userDistance);
  }

  distance(latitude1, longitude1, latitude2, longitude2) {
    const R = 6371; // km
    const dLat = this.toRad(latitude2 - latitude1);
    const dLon = this.toRad(longitude2 - longitude1);
    const lat1 = this.toRad(latitude1);
    const lat2 = this.toRad(latitude2);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  toRad(Value) {
    return (Value * Math.PI) / 180;
  }
}

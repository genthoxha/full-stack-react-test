import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@app/users/entities/users.entity';
import { Repository } from 'typeorm/index';
import { UserDistances } from '../entities/user-distances.entity';
import { UsersService } from '@app/users/services/users.service';
import { DistancesService } from '@app/distances/services/distances.service';
import { CheckpointsService } from '@app/checkpoints/services/checkpoints.service';
import { Checkpoint } from '@app/checkpoints/entities/checkpoint.entity';
import { Distance } from '@app/distances/entities/distances.entity';
import { Utils } from '@app/utils/utils';
import { CalculateDistanceByCurrentLocationDto } from '@app/user-distances/dto/CalculateDistanceByCurrentLocationDto';

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

  async calculateDistancesForAllUsers() {
    const users: Users[] = await this.userService.findAll();
    const checkPoints: Checkpoint[] = await this.checkPointService.findAll();
    const userDistances: Array<{
      user: Users;
      distance: Partial<Distance>;
      checkpointId: string;
    }> = [];
    await Promise.all(
      await checkPoints.map(async (checkpoint) => {
        await users.map(async (user) => {
          const {
            currentLatitude,
            currentLongitude,
            homeLatitude,
            homeLongitude,
          } = user;
          const distanceFromUserToHome = Utils.calculateDistance(
            currentLatitude,
            currentLongitude,
            homeLatitude,
            homeLongitude,
          );
          const { latitude, longitude, id } = checkpoint;
          const distanceFromHomeToCheckpoint = Utils.calculateDistance(
            homeLatitude,
            homeLongitude,
            latitude,
            longitude,
          );
          const distance = {
            value:
              distanceFromUserToHome +
              distanceFromHomeToCheckpoint +
              distanceFromHomeToCheckpoint,
          };
          userDistances.push({
            user,
            distance,
            checkpointId: id,
          });
        });
      }),
    );
    await Promise.all(
      userDistances.map(async (userDistances) => {
        const distance = await this.distanceService.createDistance(
          userDistances.distance,
        );
        await this.createUserDistance({
          distance,
          user: userDistances.user,
          checkpointId: userDistances.checkpointId,
        });
      }),
    );
  }

  async getUDistanceFromLocationToCheckpoint(body: CalculateDistanceByCurrentLocationDto) {
    const { latitude, longitude, checkpointId } = body;
    const checkpoint = await this.checkPointService.findOne(checkpointId);
    return Utils.calculateDistance(latitude, longitude, checkpoint.latitude, checkpoint.longitude); // Also getting back as the other cases
  }

  async getUserRankingByCheckpointId(id) {
    const rawResult = await this.userDistanceRepository
      .createQueryBuilder('ud')
      .innerJoinAndSelect(
        Checkpoint,
        'checkpoints',
        'checkpoints.id = ud.checkpointId',
      )
      .innerJoinAndSelect(Users, 'users', 'users.id = ud.userId')
      .innerJoinAndSelect(Distance, 'distances', 'ud.distanceId = distances.id')
      .addSelect('checkpoints.id', "checkpointId")
      .addSelect('users.homeLatitude', 'homeLatitude')
      .addSelect('users.homeLongitude', 'homeLongitude')
      .addSelect('users.username', 'username')
      .addSelect('users.currentLatitude', 'currentLatitude')
      .addSelect('users.currentLongitude', 'currentLongitude')
      .addSelect('checkpoints.latitude', 'checkpointLatitude')
      .addSelect('checkpoints.longitude', 'checkpointLongitude')
      .addSelect('distances.value', 'distance')
      .where('ud.checkpointId = :id', { id })
      .orderBy('distances.value', 'DESC')
      .distinct(true)
      .getRawMany();

    return rawResult.map((rawData) => {
      delete rawData.ud_checkpointId;
      delete rawData.ud_distanceId;
      delete rawData.ud_id;
      delete rawData.ud_userId;
      delete rawData.users_username;
      return rawData;
    });
  }
  async createUserDistance(
    userDistance: Partial<UserDistances>,
  ): Promise<UserDistances> {
    const oldUserDistance = await this.userDistanceRepository.find({ checkpointId: userDistance.checkpointId })
    if (oldUserDistance.length === 0) {
      return this.userDistanceRepository.save(userDistance);
    }
  }


}

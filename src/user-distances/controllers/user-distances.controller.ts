import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { UserDistancesService } from '../services/user-distances.service';
import { UserDistances } from '../entities/user-distances.entity';

@Controller('user-distances')
export class UserDistancesController {
  constructor(private readonly userDistancesService: UserDistancesService){}

  @Post()
  async createDistance(@Res() response, @Body() userDistance: UserDistances) {
    const newUserDistance = await this.userDistancesService.createUserDistance(userDistance);
    return response.status(HttpStatus.CREATED).json({
      newUserDistance
    })
  }

  @Get()
  async fetchAll(@Res() response) {
    const userDistances = await this.userDistancesService.findAll();
    return response.status(HttpStatus.OK).json({
      userDistances
    })
  }

  @Get('/calculate-distances')
  async calculateUserDistances(@Res() response) {
    const userDistances = await this.userDistancesService.calculateDistancesForAllUsers();
    return response.status(HttpStatus.OK).json({
      userDistances
    })
  }

  @Post('/calculate-distance')
  async calculateUserDistancesByCurrentLocation(@Res() response, @Body() body) {
    const userDistance = await this.userDistancesService.getUDistanceFromLocationToCheckpoint(body);
    return response.status(HttpStatus.OK).json({
      userDistance
    });
  }

  @Get('/user-ranking/:id')
  async getUserRankingByCheckpoint(@Res() response, @Param('id') id) {
    const userRankingDetails = await this.userDistancesService.getUserRankingByCheckpointId(id);
    return response.status(HttpStatus.OK).json({
      userRankingDetails
    })
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const userDistance = await this.userDistancesService.findOne(id);
    return response.status(HttpStatus.OK).json({
      userDistance
    })
  }
}

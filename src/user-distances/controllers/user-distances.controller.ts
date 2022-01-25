import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
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
    const userDistances = await this.userDistancesService.calculateDistancesPerUser();
    return response.status(HttpStatus.OK).json({
      userDistances
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

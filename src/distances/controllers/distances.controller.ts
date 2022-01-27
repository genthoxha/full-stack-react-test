import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { DistancesService } from '../services/distances.service';
import { Distance } from '../entities/distances.entity';

@Controller('distances')
export class DistancesController {
  constructor(private readonly distancesService: DistancesService) {}

  @Post()
  async createDistance(@Res() response, @Body() Users: Distance) {
    const newDistances = await this.distancesService.createDistance(Users);
    return response.status(HttpStatus.CREATED).json({
      newDistances,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const distances = await this.distancesService.findAll();
    return response.status(HttpStatus.OK).json({
      distances,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const distance = await this.distancesService.findOne(id);
    return response.status(HttpStatus.OK).json({
      distance,
    });
  }
}

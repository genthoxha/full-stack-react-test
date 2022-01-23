import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UserCheckpointsService } from '@app/user-checkpoints/services/user-checkpoints.service';
import { UserCheckpoints } from '@app/user-checkpoints/entities/user-checkpoints.entity';

@Controller('user-checkpoint')
export class UserCheckpointsController {
  constructor(private readonly userCheckpointService: UserCheckpointsService){}

  @Post()
  async createCheckpoint(@Res() response, @Body() userCheckpoint: UserCheckpoints) {
    const newUserCheckpoint = await this.userCheckpointService.createUserCheckpoint(userCheckpoint);
    return response.status(HttpStatus.CREATED).json({
      newUserCheckpoint
    })
  }

  @Get()
  async fetchAll(@Res() response) {
    const userCheckpoints = await this.userCheckpointService.findAll();
    return response.status(HttpStatus.OK).json({
      userCheckpoints
    })
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const userCheckpoint = await this.userCheckpointService.findOne(id);
    return response.status(HttpStatus.OK).json({
      userCheckpoint
    })
  }
}

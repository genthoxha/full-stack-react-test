import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CheckpointsService } from '../services/checkpoints.service';
import { Checkpoint } from '../entities/checkpoint.entity';

@Controller('checkpoints')
export class CheckpointsController {
  constructor(private readonly checkpointService: CheckpointsService){}

  @Post()
  async createCheckpoint(@Res() response, @Body() checkpoint: Checkpoint) {
    const newCheckpoint = await this.checkpointService.createCheckpoint(checkpoint);
    return response.status(HttpStatus.CREATED).json({
      newCheckpoint
    })
  }

  @Get()
  async fetchAll(@Res() response) {
    const checkpoints = await this.checkpointService.findAll();
    return response.status(HttpStatus.OK).json({
      checkpoints
    })
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const checkpoint = await this.checkpointService.findOne(id);
    return response.status(HttpStatus.OK).json({
      checkpoint
    })
  }
}

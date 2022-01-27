import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { Distance } from '../entities/distances.entity';

@Injectable()
export class DistancesService {
  constructor(
    @InjectRepository(Distance)
    private distanceRepository: Repository<Distance>,
  ){}

  findAll(): Promise<Distance[]> {
    return this.distanceRepository.find();
  }

  findOne(id: string): Promise<Distance> {
    return this.distanceRepository.findOne(id);
  }

  async createDistance(distance: Partial<Distance>): Promise<Distance> {
    return this.distanceRepository.save(distance);

   /* const result = await this.distanceRepository.find({ value: distance.value });
    if (!result) {
    }*/
  }
}

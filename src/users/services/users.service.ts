import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ){}

    findAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<Users> {
        return this.usersRepository.findOne(id);
    }

    createUser(user: Users): Promise<Users> {
        return this.usersRepository.save(user);
    }
}

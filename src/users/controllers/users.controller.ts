import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { Users } from "../entities/users.entity";
import { UsersService } from "../services/users.service";

@Controller('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    async createUser(@Res() response, @Body() user: Users) {
        const newUser = await this.usersService.createUser(user);
        return response.status(HttpStatus.CREATED).json({
            newUser
        })
    }

    @Get()
    async fetchAll(@Res() response) {
        const users = await this.usersService.findAll();
        return response.status(HttpStatus.OK).json({
            users
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const user = await this.usersService.findOne(id);
        return response.status(HttpStatus.OK).json({
            user
        })
    }

}

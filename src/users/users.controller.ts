import { Body, Controller, Delete, Get, HttpCode, Param, Post, Res } from '@nestjs/common';
import { UserService } from './users.service';
import { Response } from "express";
import { UserDto } from '../dto/user.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('init')
  getHello(): string {
    return this.userService.getHello();
  }

  @Get()
  async getUsers(): Promise<any> {
        try {
            const response = await this.userService.getUsers();
            console.log('response', response);
            return response;
        }
        catch (e) {
              console.error('Ha ocurrido un error', e);
        }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const response = this.userService.getUserById(Number(id));
    return res.json({
      response
    });
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() dataUser: UserDto, @Res() res: Response): Promise<any> {
        try {
            const response = await this.userService.createUser(dataUser);
            return res.json({
              message: 'Usuario creado satisfactoriamente',
              response
            });
        }
        catch (e) {
              console.error('Ha ocurrido un error', e);
        }
    
  }

  @Delete(':id')
  @HttpCode(201)
  deleteUser(@Param('id') id: string, @Res() res: Response) {
    this.userService.deleteUser(Number(id));
    return res.send('Se ha eliminado usuario');
  }
  
  
}

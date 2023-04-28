import { Body, ConsoleLogger, Controller, Delete, Get, HttpCode, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from "express";
import { UserDto } from './dto/user.dto';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('init')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getUsers(): any {
    return this.appService.getUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const response = this.appService.getUserById(Number(id));
    return res.json({
      response
    });
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() dataUser: UserDto, @Res() res: Response) {
    console.log(dataUser);
    const response = this.appService.createUser(dataUser);
    return res.json({
      message: 'Usuario creado satisfactoriamente',
      response
    });
  }

  @Delete(':id')
  @HttpCode(201)
  deleteUser(@Param('id') id: string, @Res() res: Response) {
    this.appService.deleteUser(Number(id));
    return res.send('Se ha eliminado usuario');
  }
  
  
}

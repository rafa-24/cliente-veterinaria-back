import { Body, Controller, Delete, Get, HttpCode, Param, Post, Res, Put } from '@nestjs/common';
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
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<any> {
        try {
              const response = await this.userService.getUserById(Number(id));
              return response !== null ?
                    res.status(200).json({
                          message: 'Usuario obtenido con exito',
                          response
                    })
                    : res.status(400).json({ message: 'Este id no existe' })
        }
        catch (e) {
            console.error('Ha ocurrido un error',e);
      }
   
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
  async deleteUser(@Param('id') id: string, @Res() res: Response): Promise<any> {
        try {
              const response = await this.userService.deleteUser(Number(id));
              return response.affected > 0 ?
                  res.json({ message: `el usuario con id ${id} ha sido eliminado` })
                  : res.status(400).json({ message: `el id ${id} no existe` });
        }
        catch (e) {
              console.error('Ha ocurrido un error', e);
        }
  }
      
      @Put(':id')
      async updateUser(@Param('id') id: string, @Body() dataUser: UserDto, @Res() res: Response): Promise<any> {
            try {
                  const response = await this.userService.updateUser(Number(id), dataUser);
                  return res.status(201).json({
                        message: `Se ha actualizado el usuario con id ${id}`,
                        data: response
                  });                  
            } catch (e) {
                  console.error('Ha ocurrido un error', e);
                  
            }
      }
      
      
  
  
}

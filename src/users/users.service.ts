import { Injectable } from '@nestjs/common';
import { users } from '../db/db';
import { UserInterface } from "../interface/user.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {

      constructor(
            @InjectRepository(User)
            private userRepository: Repository<User>
      ) {}

     
      async createUser(data: UserInterface): Promise<any>  {
            const newUser = await this.userRepository.create(data);
            console.log('nuevo usuario', newUser);
            return await this.userRepository.save(newUser);
      }

  getHello(): string {
      return 'Hello World!';
  }

      async getUsers(): Promise<User[]> {
            const users = await this.userRepository.find();
            return users;
      }

      async getUserById(id: number): Promise<User> {
            const data = await this.userRepository.findOneBy({ id });
            return data;
      }

      async deleteUser(id: number): Promise<any> {
            const data = await this.userRepository.delete(id);
            console.log('deleteUser service', data);
            return data
      }

      async updateUser(id: number, data: UserInterface): Promise<any> {
            const dataUpdate = await this.userRepository.update(id, data);
            console.log(dataUpdate);
            return dataUpdate;            
      }



}

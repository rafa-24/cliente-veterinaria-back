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

  getUserById(id: number): any {
    const data = users.find(user => user.id === id);
    return data;
  }

  deleteUser(id: number): any {
    const index = users.findIndex(user => user.id === id);
    return users.splice(index, 1);
  }



}

import { Injectable } from '@nestjs/common';
import { users } from './db/db';
import { UserInterface } from './interface/user.interface';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";


@Injectable()
export class AppService {   

  createUser(data: UserInterface): any {

    return users.push(data);
  }

  getHello(): string {
    return 'Hello World!';
  }

  getUsers(): any {
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

import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from './entity/user.entity';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'siuu',
      password: 'contraseña',
      database: 'veterinaria',
      entities: [User],
      synchronize: true
    }),
  ]
})
export class AppModule {}

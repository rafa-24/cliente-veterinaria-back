import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

      @PrimaryGeneratedColumn('increment')
      id: number;

      @Column()
      namePet: string;

      @Column()
      nameOwner: string;

      @Column()
      email: string;

      @Column({ type: 'date' })
      discharge_date: string;

      @Column()
      symptoms: string;

}
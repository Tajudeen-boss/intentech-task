import { Entity, Column, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn() 
  id: number;

  @OneToOne(() => User, (user) => user.userAddress)
  @JoinColumn()
  user: User;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  zipCode: string;
}

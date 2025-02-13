import { Entity, Column, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn() // No longer generates its own ID
  id: number;

  @OneToOne(() => User, (user) => user.userInfo)
  @JoinColumn()
  user: User;

  @Column()
  profilePhoto: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dob: string;

  @Column()
  occupation: string;

  @Column()
  gender: string;
}

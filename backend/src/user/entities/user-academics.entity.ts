import { User } from './user.entity';
import { Entity, Column, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';


@Entity()
export class UserAcademics {
  @PrimaryGeneratedColumn() 
  id: number;

  @OneToOne(() => User, (user) => user.userAcademics)
  @JoinColumn()
  user: User;

  @Column('text', { array: true }) 
  schools: string[];
}

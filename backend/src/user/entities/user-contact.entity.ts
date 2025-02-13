import { Entity, Column, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class UserContact {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.userContact)
  @JoinColumn()
  user: User;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  fax: string;

  @Column({ nullable: true })
  linkedInUrl: string;
}

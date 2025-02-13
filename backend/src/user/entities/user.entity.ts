import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserInfo } from './user-info.entity';
import { UserContact } from './user-contact.entity';
import { UserAddress } from './user-address.entity';
import { UserAcademics } from './user-academics.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserInfo, { cascade: true })
  @JoinColumn()
  userInfo: UserInfo;

  @OneToOne(() => UserContact, { cascade: true })
  @JoinColumn()
  userContact: UserContact;

  @OneToOne(() => UserAddress, { cascade: true })
  @JoinColumn()
  userAddress: UserAddress;

  @OneToOne(() => UserAcademics, { cascade: true })
  @JoinColumn()
  userAcademics: UserAcademics;
}
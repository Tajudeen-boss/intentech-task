import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; 
import { UserInfo } from './entities/user-info.entity';
import { UserContact } from './entities/user-contact.entity';
import { UserAddress } from './entities/user-address.entity';
import { UserAcademics } from './entities/user-academics.entity';
import { CreateUserDto } from './dto/create-user.dto';  
import { UpdateUserDto } from './dto/update-user.dto'; 

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)  
    private readonly userRepository: Repository<User>,  

    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,

    @InjectRepository(UserContact)
    private readonly userContactRepository: Repository<UserContact>,

    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,

    @InjectRepository(UserAcademics)
    private readonly userAcademicsRepository: Repository<UserAcademics>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('Received DTO:', createUserDto);
  
    const userEntity = new User();
    const savedUser = await this.userRepository.save(userEntity);
  
    const userInfoEntity = this.userInfoRepository.create({ ...createUserDto.userInfo, user: savedUser });
    const userContactEntity = this.userContactRepository.create({ ...createUserDto.userContact, user: savedUser });
    const userAddressEntity = this.userAddressRepository.create({ ...createUserDto.userAddress, user: savedUser });
    const userAcademicsEntity = this.userAcademicsRepository.create({
      schools: createUserDto.userAcademics.pastSchools,
      user: savedUser
    });
  
    await this.userInfoRepository.save(userInfoEntity);
    await this.userContactRepository.save(userContactEntity);
    await this.userAddressRepository.save(userAddressEntity);
    await this.userAcademicsRepository.save(userAcademicsEntity);
  
    return { savedUser, userInfoEntity, userContactEntity, userAddressEntity, userAcademicsEntity };
  }
  
  
  
  
  

  async findAll() {
    const userInfos = await this.userInfoRepository.find();
    const userContacts = await this.userContactRepository.find();
    const userAddresses = await this.userAddressRepository.find();
    const userAcademics = await this.userAcademicsRepository.find();

    return { userInfos, userContacts, userAddresses, userAcademics };
  }

  async findOne(id: number) {
    const userInfo = await this.userInfoRepository.findOne({ where: { id } });
    const userContact = await this.userContactRepository.findOne({ where: { id } });
    const userAddress = await this.userAddressRepository.findOne({ where: { id } });
    const userAcademics = await this.userAcademicsRepository.findOne({ where: { id } });

    return { userInfo, userContact, userAddress, userAcademics };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const {
      profilePhoto,
      firstName,
      lastName,
      dob,
      occupation,
      gender,
      email,
      phoneNumber,
      fax,
      linkedInUrl,
      address,
      city,
      state,
      country,
      zipCode,
      schools,
    } = updateUserDto;
  
    const existingUser = await this.userInfoRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  
    // Build update objects dynamically to avoid empty updates
    const userInfoUpdate: Partial<UserInfo> = {};
    if (firstName !== undefined) userInfoUpdate.firstName = firstName;
    if (lastName !== undefined) userInfoUpdate.lastName = lastName;
    if (dob !== undefined) userInfoUpdate.dob = dob.toISOString();
    if (occupation !== undefined) userInfoUpdate.occupation = occupation;
    if (gender !== undefined) userInfoUpdate.gender = gender;
  
    const userContactUpdate: Partial<UserContact> = {};
    if (email !== undefined) userContactUpdate.email = email;
    if (phoneNumber !== undefined) userContactUpdate.phoneNumber = phoneNumber;
    if (fax !== undefined) userContactUpdate.fax = fax;
    if (linkedInUrl !== undefined) userContactUpdate.linkedInUrl = linkedInUrl;
  
    const userAddressUpdate: Partial<UserAddress> = {};
    if (address !== undefined) userAddressUpdate.address = address;
    if (city !== undefined) userAddressUpdate.city = city;
    if (state !== undefined) userAddressUpdate.state = state;
    if (country !== undefined) userAddressUpdate.country = country;
    if (zipCode !== undefined) userAddressUpdate.zipCode = zipCode;
  
    const userAcademicsUpdate: Partial<UserAcademics> = {};
    if (schools !== undefined) userAcademicsUpdate.schools = schools;
  
    // Perform updates only if there is data to update
    if (Object.keys(userInfoUpdate).length > 0) {
      await this.userInfoRepository.update(id, userInfoUpdate);
    }
    if (Object.keys(userContactUpdate).length > 0) {
      await this.userContactRepository.update(id, userContactUpdate);
    }
    if (Object.keys(userAddressUpdate).length > 0) {
      await this.userAddressRepository.update(id, userAddressUpdate);
    }
    if (Object.keys(userAcademicsUpdate).length > 0) {
      await this.userAcademicsRepository.update(id, userAcademicsUpdate);
    }
  
    return this.findOne(id);
  }
  

  async remove(id: number) {
    await this.userInfoRepository.delete(id);
    await this.userContactRepository.delete(id);
    await this.userAddressRepository.delete(id);
    await this.userAcademicsRepository.delete(id);

    return { message: 'User deleted successfully' };
  }
}

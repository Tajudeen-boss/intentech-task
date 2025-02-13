export class UserInfoDto {
  profilePhoto: string;
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: string;
}

export class UserContactDto {
  email: string;
  phoneNumber: string;
  fax?: string;
  linkedInUrl?: string;
}

export class UserAddressDto {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export class UserAcademicsDto {
  pastSchools: string[];
}

export class CreateUserDto {
  userInfo: UserInfoDto;
  userContact: UserContactDto;
  userAddress: UserAddressDto;
  userAcademics: UserAcademicsDto;
}

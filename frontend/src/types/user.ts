export interface UserInfo {
    id: number;
    profilePhoto: string;
    firstName: string;
    lastName: string;
    dob: string;
    occupation: string;
    gender: string;
  }
  
  export interface UserContact {
    id: number;
    email: string;
    phoneNumber: string;
    fax: string;
    linkedInUrl: string;
  }
  
  export interface UserAddress {
    id: number;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  }
  
  export interface UserAcademics {
    id: number;
    schools: string[];
  }
  
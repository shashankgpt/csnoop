export interface IProfile {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  website: string;
  location: string;
}

export interface IProfileExtended {
  username: string;
  profile: IProfile;
}

export interface IPasswordChange {
newPassword: string;
oldPassword: string;
}

export interface IProfileAdmin {
  active: boolean;
  createdAt: string;
  email: string;
  lock: boolean;
  profile: CompleteProfile;
  role: number;
  username: string;
  updatedAt: string;
  _id: string;
}

export interface CompleteProfile {
  firstName: string;
  lastName: string;
  location: string;
  website: string;
  gender: number;
}

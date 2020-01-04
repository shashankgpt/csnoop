import { isNumber } from 'util';

export enum role {
    superAdmin = 1,
    admin = 2,
    moderator = 3,
    user = 4,
    }

export const roleObject = {
  1: 'super Admin',
  2: 'Admin',
  3: 'Moderator',
  4: 'User',
};

// export const roleNum: number[] = Object.keys(role).map((k: string) => role.admin);
export const roleNum = Object.keys(role).filter((item) => {
  return isNumber(Number(item));
});

export const roleArr = Object.keys(role).filter((item) => {
  return item;
});

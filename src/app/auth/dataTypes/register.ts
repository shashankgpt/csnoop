import { ILogin } from './login';

export interface IRegister extends ILogin {
  email: string;
}

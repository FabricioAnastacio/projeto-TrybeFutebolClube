import IUser from '../User';

export interface ILoginValidation {
  email: string,
  password: string,
}

export interface ILogin {
  findByEmail(email: string): Promise<IUser | null>,
}

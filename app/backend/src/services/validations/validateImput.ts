import { ServiceError } from '../../Interfaces/serviceResponse';
import { ILoginValidation } from '../../Interfaces/user/IUser';

const emailValid = /^[a-z0-9]+@[a-z0-9]+\.[a-z]/i;

function verifyUser(data: ILoginValidation): ServiceError | null {
  const { email, password } = data;

  if (!email || !password) {
    return { status: 'INVALID_VALUE', data: { message: 'All fields must be filled' } };
  }

  if (!email.match(emailValid) || password.length < 6) {
    return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
  }

  return null;
}

export default verifyUser;

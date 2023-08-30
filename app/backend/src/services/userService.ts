import * as bcrypt from 'bcryptjs';
import ModelUser from '../models/userModel';
import { ILogin, ILoginValidation } from '../Interfaces/user/IUser';
import { ServiceRespose } from '../Interfaces/serviceResponse';
import IToken from '../Interfaces/IToken';
import JWT from '../utils/JWT';
import verifyUser from './validations/validateImput';

class UserService {
  constructor(
    private userModel: ILogin = new ModelUser(),
  ) {}

  public async validateUser(people: ILoginValidation): Promise<ServiceRespose<IToken>> {
    const { email, password } = people;

    const error = verifyUser({ email, password });
    if (error) return { status: error.status, data: error.data };

    const user = await this.userModel.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const payload = {
      id: user.id,
      email,
    };
    const token = JWT.createToken(payload);

    return { status: 'SUCCESSFUL', data: { token } };
  }
}

export default UserService;

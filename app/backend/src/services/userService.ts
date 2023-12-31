import * as bcrypt from 'bcryptjs';
import ModelUser from '../models/userModel';
import { ILogin, ILoginRole, ILoginValidation } from '../Interfaces/ILogin';
import { ServiceRespose } from '../Interfaces/serviceResponse';
import IToken from '../Interfaces/IToken';
import JWT, { TokenPayload } from '../utils/JWT';
import verifyUser from './validations/validateImput';
import IUser from '../Interfaces/User';

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
      email,
    };
    const token = JWT.createToken(payload);

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getUserRole(payload: TokenPayload): Promise<ServiceRespose<ILoginRole>> {
    const { email } = payload;
    const user = await this.userModel.findByEmail(email);

    const { role } = user as IUser;

    return { status: 'SUCCESSFUL', data: { role } };
  }
}

export default UserService;

import IUser from '../Interfaces/User';
import UserModel from '../database/models/UserModel';
import { ILogin } from '../Interfaces/ILogin';

class ModelUser implements ILogin {
  private model = UserModel;

  async findByEmail(email = ''): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}

export default ModelUser;

import { ServiceRespose } from '../Interfaces/serviceResponse';
import { IReturnAllandOne } from '../Interfaces/ICRUDModel';
import IMatche from '../Interfaces/Matche';
import MatchesModel from '../models/matcheModel';

class MatcheService {
  constructor(
    private matcheModel: IReturnAllandOne<IMatche> = new MatchesModel(),
  ) {}

  public async findAll(): Promise<ServiceRespose<IMatche[]>> {
    const matches = await this.matcheModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }
}

export default MatcheService;

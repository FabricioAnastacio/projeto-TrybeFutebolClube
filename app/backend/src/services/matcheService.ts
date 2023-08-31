import { ServiceRespose } from '../Interfaces/serviceResponse';
import IMatche from '../Interfaces/Matche';
import MatchesModel from '../models/matcheModel';

class MatcheService {
  constructor(
    private matcheModel = new MatchesModel(),
  ) {}

  public async findAll(): Promise<ServiceRespose<IMatche[]>> {
    const matches = await this.matcheModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async findAllProgress(inProgress: boolean): Promise<ServiceRespose<IMatche[]>> {
    const matcheProgress = await this.matcheModel.findAllInProgress(inProgress);
    if (!matcheProgress) return { status: 'NOT_FOUND', data: { message: 'Matche not found' } };

    return { status: 'SUCCESSFUL', data: matcheProgress };
  }
}

export default MatcheService;

import { ServiceRespose } from '../Interfaces/serviceResponse';
import IMatche, { IGoals, INewMatche } from '../Interfaces/Matche';
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

  public async updateStatusMatche(id: string): Promise<ServiceRespose<void>> {
    await this.matcheModel.updateStatus(id);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateGoalsMetche(id: string, data: IGoals): Promise<ServiceRespose<IMatche>> {
    const responseNewMatche = await this.matcheModel.updateGoalsMatch(id, data);
    if (!responseNewMatche) return { status: 'NOT_FOUND', data: { message: 'Matche not found' } };

    return { status: 'SUCCESSFUL', data: responseNewMatche };
  }

  public async createMatche(data: INewMatche): Promise<ServiceRespose<IMatche>> {
    const matche = { ...data, inProgress: true };
    const newMatche = await this.matcheModel.create(matche);
    if (!newMatche) return { status: 'INVALID_VALUE', data: { message: '' } };

    return { status: 'CREATED', data: newMatche };
  }
}

export default MatcheService;

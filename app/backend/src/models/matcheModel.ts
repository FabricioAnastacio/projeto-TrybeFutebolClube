import TeamModel from '../database/models/TeamModel';
import MatcheModel from '../database/models/MatcheModel';
import IMatche, { IGoals, INewMatche } from '../Interfaces/Matche';
import { IMatcheModel } from '../Interfaces/ICRUDModel';

const include = [
  {
    model: TeamModel,
    as: 'homeTeam',
    attributes: ['teamName'],
  },
  {
    model: TeamModel,
    as: 'awayTeam',
    attributes: ['teamName'],
  },
];

class MatchesModel implements IMatcheModel<IMatche> {
  private model = MatcheModel;

  async findAll(): Promise<IMatche[]> {
    const allMatches = await this.model.findAll({ include });
    return allMatches;
  }

  async findById(id: number | string): Promise<IMatche | null> {
    const oneMatche = await this.model.findByPk(id, { include });
    return oneMatche;
  }

  async findAllInProgress(inProgress: boolean): Promise<IMatche[]> {
    const matches = await this.model.findAll({
      where: { inProgress },
      include,
    });

    return matches;
  }

  async updateStatus(id: string): Promise<number[]> {
    const dataRespose = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );

    return dataRespose;
  }

  async updateGoalsMatch(id: string, data: IGoals): Promise<IMatche | null> {
    const { awayTeamGoals, homeTeamGoals } = data;

    await this.model.update(
      { awayTeamGoals, homeTeamGoals },
      { where: { id } },
    );

    const newMatche = await this.findById(id);

    return newMatche;
  }

  async create(data: INewMatche): Promise<IMatche> {
    const { dataValues } = await this.model.create(data);

    return dataValues;
  }
}

export default MatchesModel;

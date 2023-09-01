import TeamModel from '../database/models/TeamModel';
import MatcheModel from '../database/models/MatcheModel';
import IMatche, { IGoals, INewMatche } from '../Interfaces/Matche';
import {
  IInProgressFunction,
  IReturnAllandOne,
  IUpdateGoalsMatche,
  IUpdateStatusMatche,
} from '../Interfaces/ICRUDModel';

class MatchesModel implements
IReturnAllandOne<IMatche>,
IInProgressFunction<IMatche>,
IUpdateStatusMatche,
IUpdateGoalsMatche<IMatche> {
  private model = MatcheModel;

  async findAll(): Promise<IMatche[]> {
    const allMatches = await this.model.findAll({
      include: [
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
      ],
    });
    return allMatches;
  }

  async findById(id: string): Promise<IMatche | null> {
    const oneMatche = await this.model.findByPk(id, {
      include: [
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
      ],
    });
    return !oneMatche ? null : oneMatche;
  }

  async findAllInProgress(inProgress: boolean): Promise<IMatche[] | null> {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
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
      ],
    });

    return !matches ? null : matches;
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

  async create(data: INewMatche): Promise<IMatche | null> {
    const { dataValues } = await this.model.create(data);

    return dataValues;
  }
}

export default MatchesModel;

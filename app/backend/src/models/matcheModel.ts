import TeamModel from '../database/models/TeamModel';
import MatcheModel from '../database/models/MatcheModel';
import { IInProgressFunction, IReturnAllandOne } from '../Interfaces/ICRUDModel';
import IMatche from '../Interfaces/Matche';

class MatchesModel implements IReturnAllandOne<IMatche>, IInProgressFunction<IMatche> {
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

  async findById(id: number): Promise<IMatche | null> {
    const oneMatche = await this.model.findByPk(id);
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
}

export default MatchesModel;

import TeamModel from '../database/models/TeamModel';
import MatcheModel from '../database/models/MatcheModel';
import { IReturnAllandOne } from '../Interfaces/ICRUDModel';
import IMatche from '../Interfaces/Matche';

class MatchesModel implements IReturnAllandOne<IMatche> {
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
}

export default MatchesModel;

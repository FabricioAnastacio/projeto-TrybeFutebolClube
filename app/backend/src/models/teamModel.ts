import ITeam from '../Interfaces/Team';
import { IReturnAllandOne } from '../Interfaces/ICRUDModel';
import TeamModel from '../database/models/TeamModel';

class TeamsModel implements IReturnAllandOne<ITeam> {
  private model = TeamModel;

  async findAll(): Promise<ITeam[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }

  async findById(id: string | number): Promise<ITeam | null> {
    const oneTeam = await this.model.findByPk(id);
    return !oneTeam ? null : oneTeam;
  }
}

export default TeamsModel;

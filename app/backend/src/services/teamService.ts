import TeamsModel from '../models/teamModel';
import { IReturnAllandOne } from '../Interfaces/ICRUDModel';
import ITeam from '../Interfaces/Team';
import { ServiceRespose } from '../Interfaces/serviceResponse';

class TeamService {
  constructor(
    private teamModel: IReturnAllandOne<ITeam> = new TeamsModel(),
  ) { }

  public async findAll(): Promise<ServiceRespose<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}

export default TeamService;

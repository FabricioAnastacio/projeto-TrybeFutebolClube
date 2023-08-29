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

  public async findById(id: number): Promise<ServiceRespose<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'User not found' } };

    return { status: 'SUCCESSFUL', data: team };
  }
}

export default TeamService;

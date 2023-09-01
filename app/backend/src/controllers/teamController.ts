import { Request, Response } from 'express';
import TeamService from '../services/teamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private serviceTeam = new TeamService(),
  ) {}

  public async getAllTeams(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.serviceTeam.findAll();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getOneTeam(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.serviceTeam.findById(id);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}

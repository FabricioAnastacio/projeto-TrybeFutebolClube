import { Request, Response } from 'express';
import Leaderboard from '../services/leaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(private leaderboardService = new Leaderboard()) {
  }

  public async getLeaderboardHome(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.findAllLeaderboardsHome();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getLeaderboardAway(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.findAllLeaderboardsAway();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getLeaderboardGeneral(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.findAllLeaderboards();

    return res.status(mapStatusHTTP(status)).json(data);
  }
}

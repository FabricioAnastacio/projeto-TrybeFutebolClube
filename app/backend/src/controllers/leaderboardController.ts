import { Request, Response } from 'express';
import Leaderboard from '../services/leaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(private leaderboardService = new Leaderboard()) {
  }

  public async getLeaderboard(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.getLeaderboards();

    return res.status(mapStatusHTTP(status)).json(data);
  }
}

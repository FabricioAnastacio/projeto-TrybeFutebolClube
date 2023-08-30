import { Request, Response } from 'express';
import MatcheService from '../services/matcheService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class MatcheController {
  constructor(
    private serviceMatches = new MatcheService(),
  ) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.serviceMatches.findAll();

    return res.status(mapStatusHTTP(status)).json(data);
  }
}

export default MatcheController;

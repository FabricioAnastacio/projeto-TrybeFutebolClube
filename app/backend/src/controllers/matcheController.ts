import { Request, Response } from 'express';
import MatcheService from '../services/matcheService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class MatcheController {
  constructor(
    private serviceMatches = new MatcheService(),
  ) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress === 'true' || inProgress === 'false') {
      const isProgress = inProgress === 'true';
      const { status, data } = await this.serviceMatches.findAllProgress(isProgress);

      return res.status(mapStatusHTTP(status)).json(data);
    }

    const { status, data } = await this.serviceMatches.findAll();

    return res.status(mapStatusHTTP(status)).json(data);
  }
}

export default MatcheController;

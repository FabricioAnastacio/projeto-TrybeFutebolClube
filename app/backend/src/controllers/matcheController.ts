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

  public async setStatusMatche(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.serviceMatches.updateStatusMatche(id);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async setGoalsMatche(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const dataGoals = req.body;

    const { status, data } = await this.serviceMatches.updateGoalsMetche(id, dataGoals);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async setNewMatche(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { status, data } = await this.serviceMatches.createMatche(body);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}

export default MatcheController;

import { Router } from 'express';
import MatcheController from '../controllers/matcheController';

const matches = new MatcheController();

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matches.getAllMatches(req, res));

export default matchesRouter;

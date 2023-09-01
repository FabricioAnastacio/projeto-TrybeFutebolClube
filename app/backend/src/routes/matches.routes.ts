import { Router } from 'express';
import MatcheController from '../controllers/matcheController';
import Validations from '../middleware/validations';

const matches = new MatcheController();

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matches.getAllMatches(req, res));

matchesRouter.post('/', Validations.validateJWT, (req, res) => matches.setNewMatche(req, res));

matchesRouter.patch(
  '/:id',
  Validations.validateJWT,
  (req, res) => matches.setGoalsMatche(req, res),
);

matchesRouter.patch(
  '/:id/finish',
  Validations.validateJWT,
  (req, res) => matches.setStatusMatche(req, res),
);

export default matchesRouter;

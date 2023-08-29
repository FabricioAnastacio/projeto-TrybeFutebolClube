import { Router } from 'express';
import TeamController from '../controllers/teamController';

const teams = new TeamController();

const teamRouter = Router();

teamRouter.get('/', (req, res) => teams.getAllTeams(req, res));

export default teamRouter;

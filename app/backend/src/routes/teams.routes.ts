import { Router } from 'express';
import TeamController from '../controllers/teamController';

const teams = new TeamController();

const teamRouter = Router();

teamRouter.get('/', (req, res) => teams.getAllTeams(req, res));

teamRouter.get('/:id', (req, res) => teams.getOneTeam(req, res));

export default teamRouter;

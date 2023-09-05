import { Router } from 'express';
// import Validations from '../middleware/validations';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboard = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req, res) => leaderboard.getLeaderboard(req, res),
);

export default leaderboardRouter;

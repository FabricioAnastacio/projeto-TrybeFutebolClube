import { Router } from 'express';
// import Validations from '../middleware/validations';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboard = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req, res) => leaderboard.getLeaderboardHome(req, res),
);

leaderboardRouter.get(
  '/away',
  (req, res) => leaderboard.getLeaderboardAway(req, res),
);

leaderboardRouter.get(
  '/',
  (req, res) => leaderboard.getLeaderboardGeneral(req, res),
);

export default leaderboardRouter;

import { ILeaderboardModel } from '../Interfaces/ICRUDModel';
import sequelize from '../database/models';
import ILeaderboard from '../Interfaces/ILeaderboard';
import {
  queryLeaderboardHome,
  queryLeaderboardAway,
} from '../utils/queryLeaderboard';

class LeaderboardModel implements ILeaderboardModel {
  constructor(private db = sequelize) {}

  public async getAllLeaderboardHome(): Promise<ILeaderboard[]> {
    const [leaderboard] = await this.db.query(queryLeaderboardHome);

    return leaderboard as unknown as ILeaderboard[];
  }

  public async getAllLeaderboardAway(): Promise<ILeaderboard[]> {
    const [leaderboard] = await this.db.query(queryLeaderboardAway);

    return leaderboard as unknown as ILeaderboard[];
  }
}

export default LeaderboardModel;

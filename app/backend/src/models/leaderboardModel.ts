import sequelize from '../database/models';
import ILeaderboard from '../Interfaces/Leaderboard';
import queryLeaderboard from '../utils/queryLeaderboard';

class LeaderboardModel {
  constructor(private db = sequelize) {}

  public async getAllLeaderboard(): Promise<ILeaderboard[]> {
    const [leaderboard] = await this.db.query(queryLeaderboard);

    return leaderboard as unknown as ILeaderboard[];
  }
}

export default LeaderboardModel;

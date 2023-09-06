import sequelize from '../database/models';
import ILeaderboard from '../Interfaces/Leaderboard';
import {
  queryLeaderboardHome,
  queryLeaderboardAway,
} from '../utils/queryLeaderboard';

class LeaderboardModel {
  constructor(private db = sequelize) {}

  public async getAllLeaderboardHome(): Promise<ILeaderboard[]> {
    const [leaderboard] = await this.db.query(queryLeaderboardHome);

    return leaderboard as unknown as ILeaderboard[];
  }

  public async getAllLeaderboardAway(): Promise<ILeaderboard[]> {
    const [leaderboard] = await this.db.query(queryLeaderboardAway);

    return leaderboard as unknown as ILeaderboard[];
  }

  // public async getAllLeaderboard(): Promise<ILeaderboard[]> {
  //   const [leaderboard] = await this.db.query(queryLeaderboardGeneral);

  //   return leaderboard as unknown as ILeaderboard[];
  // }
}

export default LeaderboardModel;

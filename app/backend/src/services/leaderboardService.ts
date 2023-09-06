import ILeaderboard from '../Interfaces/Leaderboard';
import { ServiceRespose } from '../Interfaces/serviceResponse';
import LeaderboardModel from '../models/leaderboardModel';

class Leaderboard {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) {
  }

  public async findAllLeaderboardsHome(): Promise<ServiceRespose<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.getAllLeaderboardHome();
    return { status: 'SUCCESSFUL', data: leaderboard };
  }

  public async findAllLeaderboardsAway(): Promise<ServiceRespose<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.getAllLeaderboardAway();
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}

export default Leaderboard;

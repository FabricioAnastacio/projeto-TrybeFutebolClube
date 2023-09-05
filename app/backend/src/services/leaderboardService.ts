import ILeaderboard from '../Interfaces/Leaderboard';
import { ServiceRespose } from '../Interfaces/serviceResponse';
import LeaderboardModel from '../models/leaderboardModel';

class Leaderboard {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) {
  }

  public async getLeaderboards(): Promise<ServiceRespose<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.getAllLeaderboard();
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}

export default Leaderboard;

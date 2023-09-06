import ILeaderboard from '../Interfaces/Leaderboard';
import { ServiceRespose } from '../Interfaces/serviceResponse';
import LeaderboardModel from '../models/leaderboardModel';

class Leaderboard {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) {
  }

  static getTable(leaderboardHome: ILeaderboard, leaderboardAway: ILeaderboard) {
    const totalPoints = leaderboardAway.totalPoints + leaderboardHome.totalPoints;
    const totalGames = leaderboardAway.totalGames + leaderboardHome.totalGames;

    return {
      name: leaderboardHome.name,
      totalPoints,
      totalGames,
      totalVictories: leaderboardAway.totalVictories + leaderboardHome.totalVictories,
      totalDraws: leaderboardAway.totalDraws + leaderboardHome.totalDraws,
      totalLosses: leaderboardAway.totalLosses + leaderboardHome.totalLosses,
      goalsFavor: leaderboardAway.goalsFavor + leaderboardHome.goalsFavor,
      goalsOwn: leaderboardAway.goalsOwn + leaderboardHome.goalsOwn,
      goalsBalance: leaderboardAway.goalsBalance + leaderboardHome.goalsBalance,
      efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
    };
  }

  public async findAllLeaderboardsHome(): Promise<ServiceRespose<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.getAllLeaderboardHome();
    return { status: 'SUCCESSFUL', data: leaderboard };
  }

  public async findAllLeaderboardsAway(): Promise<ServiceRespose<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.getAllLeaderboardAway();
    return { status: 'SUCCESSFUL', data: leaderboard };
  }

  public async findAllLeaderboards(): Promise<ServiceRespose<ILeaderboard[]>> {
    const leaderboardAway = await this.leaderboardModel.getAllLeaderboardAway();
    const leaderboardHome = await this.leaderboardModel.getAllLeaderboardHome();

    const allLeaderboard = leaderboardHome.map((home) => leaderboardAway.map(
      (away) => home.name === away.name && Leaderboard.getTable(home, away),
    ));

    const respose = [] as ILeaderboard[];

    allLeaderboard.forEach((leaderboard) => leaderboard.forEach((board) => {
      if (board) {
        respose.push(board);
      }
    }));

    respose.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);

    return { status: 'SUCCESSFUL', data: respose };
  }
}

export default Leaderboard;

import ILeaderboard from '../Interfaces/Leaderboard';
import IMatche from '../Interfaces/Matche';
import MatchesModel from '../models/matcheModel';
import TeamsModel from '../models/teamModel';
import { ServiceRespose } from '../Interfaces/serviceResponse';
import ITeam from '../Interfaces/Team';

class Leaderboard {
  constructor(
    private matcheModel = new MatchesModel(),
    private teamModel = new TeamsModel(),
  ) {
  }

  static gamesQuantity(mathes: IMatche[], teamId: number) {
    const quantity = mathes.filter((math) => math.homeTeamId === teamId);

    return quantity;
  }

  static getScoreboard(mathes: IMatche[], teamHome: number) {
    const matchesHome = Leaderboard.gamesQuantity(mathes, teamHome);
    const quantityVictories = matchesHome.filter(
      (math) => math.homeTeamGoals > math.awayTeamGoals,
    );
    const quantityDraws = matchesHome.filter(
      (math1) => math1.homeTeamGoals === math1.awayTeamGoals,
    );
    const quantityLoser = matchesHome.filter(
      (math2) => math2.homeTeamGoals < math2.awayTeamGoals,
    );
    return {
      victories: quantityVictories.length,
      draws: quantityDraws.length,
      lossers: quantityLoser.length,
    };
  }

  static gamePoints(mathes: IMatche[], teamHome: number) {
    const scoreboard = Leaderboard.getScoreboard(mathes, teamHome);

    return (scoreboard.victories * 3) + scoreboard.draws;
  }

  static getEfficiency(mathes: IMatche[], teamHome: number) {
    const totalPoints = Leaderboard.gamePoints(mathes, teamHome);
    const totalGames = Leaderboard.gamesQuantity(mathes, teamHome).length;

    return ((totalGames * 3) / totalPoints) * 100;
  }

  static getGoalsFavor(mathes: IMatche[], idTeam: number) {
    let goalsFavor = 0;
    let goalsOwn = 0;
    mathes.forEach((mathe) => {
      if (mathe.homeTeamId === idTeam) {
        goalsFavor += mathe.homeTeamGoals;
      }
    });
    mathes.forEach((mathe) => {
      if (mathe.homeTeamId === idTeam) {
        goalsOwn += mathe.awayTeamGoals;
      }
    });

    return {
      goalsFavor,
      goalsOwn,
      goalsBalance: Math.abs(goalsFavor - goalsOwn),
    };
  }

  static returnTable(mathes: IMatche[], teamName: string, teamHomeId: number) {
    return {
      name: teamName,
      totalPoints: Leaderboard.gamePoints(mathes, teamHomeId),
      totalGames: Leaderboard.gamesQuantity(mathes, teamHomeId).length,
      totalVictories: Leaderboard.getScoreboard(mathes, teamHomeId).victories,
      totalDraws: Leaderboard.getScoreboard(mathes, teamHomeId).draws,
      totalLosses: Leaderboard.getScoreboard(mathes, teamHomeId).lossers,
      goalsFavor: Leaderboard.getGoalsFavor(mathes, teamHomeId).goalsFavor,
      goalsOwn: Leaderboard.getGoalsFavor(mathes, teamHomeId).goalsOwn,
      goalsBalance: Leaderboard.getGoalsFavor(mathes, teamHomeId).goalsBalance,
      efficiency: Leaderboard.getEfficiency(mathes, teamHomeId).toFixed(2),
    };
  }

  public async getLeaderboards(): Promise<ServiceRespose<ILeaderboard[]>> {
    const mathes = await this.matcheModel.findAllInProgress(false);
    const leaderboard = mathes.map(async (mathe) => {
      const { teamName } = await this.teamModel.findById(mathe.homeTeamId) as unknown as ITeam;
      const { homeTeamId } = mathe;

      return Leaderboard.returnTable(mathes, teamName, homeTeamId);
    });
    // 'leaderboard tem objetos repetidos, ett,'
    // COMO REMOVER ELEMENTOS REPETIDOS DE UM ARRAY?????

    console.log((await Promise.all(leaderboard)).length);
    return { status: 'SUCCESSFUL', data: await Promise.all(leaderboard) };
  }
}

export default Leaderboard;

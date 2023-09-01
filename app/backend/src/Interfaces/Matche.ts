export interface IGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export default interface IMatche extends IGoals {
  id: number,
  homeTeamId: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

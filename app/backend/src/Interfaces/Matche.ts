export interface IGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export default interface IMatche extends IGoals {
  id: number,
  homeTeamId: number,
  awayTeamId: number,
  inProgress: boolean,
}

export type INewMatche = Omit<IMatche, 'id'>;

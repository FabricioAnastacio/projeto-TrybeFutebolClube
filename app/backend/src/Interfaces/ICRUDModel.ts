import ILeaderboard from './ILeaderboard';
import { IGoals, INewMatche } from './Matche';

export interface ILeaderboardModel {
  getAllLeaderboardHome(): Promise<ILeaderboard[]>
  getAllLeaderboardAway(): Promise<ILeaderboard[]>
}

export interface IUpdateStatusMatche {
  updateStatus(id: string): Promise<number[]>
}

export interface IUpdateGoalsMatche<T> {
  updateGoalsMatch(id: string, data: IGoals): Promise<T | null>
}

export interface IInProgressFunction<T> {
  findAllInProgress(inProgress: boolean): Promise<T[]>
}

export interface IReturnAllandOne<T> {
  findAll(): Promise<T[]>
  findById(id: string | number): Promise<T | null>
}

export interface IMatcheModel<T> extends
  IReturnAllandOne<T>,
  IInProgressFunction<T>,
  IUpdateGoalsMatche<T>,
  IUpdateStatusMatche {
  create(data: INewMatche): Promise<T>,
}

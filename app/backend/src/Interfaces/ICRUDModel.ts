import { IGoals } from './Matche';

export interface IUpdateStatusMatche {
  updateStatus(id: string): Promise<number[]>
}

export interface IUpdateGoalsMatche<T> {
  updateGoalsMatch(id: string, data: IGoals): Promise<T | null>
}

export interface IInProgressFunction<T> {
  findAllInProgress(inProgress: boolean): Promise<T[] | null>
}

export interface IReturnAllandOne<T> {
  findAll(): Promise<T[]>
  findById(id: string): Promise<T | null>
}

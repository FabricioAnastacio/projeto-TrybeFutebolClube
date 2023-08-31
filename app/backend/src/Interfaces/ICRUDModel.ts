export interface IInProgressFunction<T> {
  findAllInProgress(inProgress: boolean): Promise<T[] | null>
}

export interface IReturnAllandOne<T> {
  findAll(): Promise<T[]>
  findById(id: number): Promise<T | null>
}

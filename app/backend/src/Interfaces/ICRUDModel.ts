export interface IReturnAllandOne<T> {
  findAll(): Promise<T[]>
  findById(id: number): Promise<T | null>
}

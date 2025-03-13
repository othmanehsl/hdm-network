import { Injectable } from '@nestjs/common';
import TaskRepository from '../Repositories/TaskRepository';
import DeleteTask from './DeleteTask/DeleteTask';
import GetAllTasksUseCase from './GetAllTasks/GetAllTasksUseCase';
import SaveTaskUseCase from './SaveTask/SaveTaskUseCase';

@Injectable()
export default class UseCaseFactory {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create<T>(useCase: new (...args: any[]) => T): Promise<T> {
    if (useCase === GetAllTasksUseCase) {
      return new GetAllTasksUseCase(this.taskRepository) as T;
    }
    if (useCase === SaveTaskUseCase) {
      return new SaveTaskUseCase(this.taskRepository) as T;
    }
    if (useCase === DeleteTask) {
      return new DeleteTask(this.taskRepository) as T;
    }
    throw new Error('UseCase non supporté');
  }
}

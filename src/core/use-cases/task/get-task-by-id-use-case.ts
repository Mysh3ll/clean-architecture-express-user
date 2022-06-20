import { Task } from '../../domain/entities/task/task';
import { TaskRepository } from '../../domain/repositories/task-repository';

export interface GetTaskByIdUseCaseInterface {
  execute(id: string): Promise<Task>;
}

export class GetTaskByIdUseCase implements GetTaskByIdUseCaseInterface {
  #taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.#taskRepository = taskRepository;
  }

  async execute(id: string): Promise<Task> {
    return this.#taskRepository.getById(id);
  }
}

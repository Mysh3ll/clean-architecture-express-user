import { TaskRepository } from '../../domain/repositories/task-repository';

interface DeleteTaskUseCaseInterface {
  execute(taskId: string): Promise<void>;
}

export class DeleteTaskUseCase implements DeleteTaskUseCaseInterface {
  #taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.#taskRepository = taskRepository;
  }

  async execute(taskId: string): Promise<void> {
    return this.#taskRepository.delete(taskId);
  }
}

import { TaskRepository } from '../../domain/repositories/task-repository';
import TaskSnapshotType from '../../domain/entities/task/types/taskSnapshot';

interface GetTaskUseCaseInterface {
  execute(): Promise<TaskSnapshotType[]>;
}

export class GetTaskUseCase implements GetTaskUseCaseInterface {
  #taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.#taskRepository = taskRepository;
  }

  async execute(): Promise<TaskSnapshotType[]> {
    return this.#taskRepository.findAll();
  }
}

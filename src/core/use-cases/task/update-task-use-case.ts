import TaskUpdateDataType from '../../domain/entities/task/types/taskUpdateData';
import { TaskRepository } from '../../domain/repositories/task-repository';
import TaskSnapshotType from '../../domain/entities/task/types/taskSnapshot';
import { Task } from '../../domain/entities/task/task';

interface UpdateTaskUseCaseInterface {
  execute(taskUpdateDataType: TaskUpdateDataType): Promise<void>;
}

export class UpdateTaskUseCase implements UpdateTaskUseCaseInterface {
  #taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.#taskRepository = taskRepository;
  }

  async execute(taskUpdateData: TaskUpdateDataType): Promise<void> {
    const taskFound: Task = await this.#taskRepository.getById(
      taskUpdateData.id
    );
    const taskUpdated: TaskSnapshotType = taskFound.update(taskUpdateData);

    await this.#taskRepository.update(taskUpdated);
  }
}

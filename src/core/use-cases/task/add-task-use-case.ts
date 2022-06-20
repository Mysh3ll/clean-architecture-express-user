import { Task } from '../../domain/entities/task/task';
import { TaskRepository } from '../../domain/repositories/task-repository';
import TaskAddDataType from '../../domain/entities/task/types/taskAddData';
import { IdGenerator } from '../../domain/services/id-generator';

interface AddTaskUseCaseInterface {
  execute(taskAddDataType: TaskAddDataType): Promise<void>;
}

export class AddTaskUseCase implements AddTaskUseCaseInterface {
  #taskRepository: TaskRepository;
  #idGenerator: IdGenerator;

  constructor(taskRepository: TaskRepository, idGenerator: IdGenerator) {
    this.#taskRepository = taskRepository;
    this.#idGenerator = idGenerator;
  }

  async execute(taskAddDataType: TaskAddDataType): Promise<void> {
    const task: Task = new Task(
      this.#idGenerator.generate(),
      taskAddDataType.title,
      taskAddDataType.description,
      taskAddDataType.status,
      taskAddDataType.createdAt,
      taskAddDataType.updatedAt,
      taskAddDataType.userId
    );

    await this.#taskRepository.save(task);
  }
}

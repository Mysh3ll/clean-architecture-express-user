import { TaskRepository } from '../../../core/domain/repositories/task-repository';
import { Task } from '../../../core/domain/entities/task/task';
import { Logger } from '../../../core/domain/services/logger';
import TaskSnapshotType from '../../../core/domain/entities/task/types/taskSnapshot';

export class InMemoryTaskRepository implements TaskRepository {
  #tasks: TaskSnapshotType[] = [];
  #logger: Logger;

  constructor(logger: Logger) {
    this.#logger = logger;
  }

  async getById(id: string): Promise<Task> {
    return Promise.resolve(Task.restore(this.#tasks[0]));
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  async findAll(): Promise<TaskSnapshotType[]> {
    this.#logger.debug(`InMemoryTaskRepository.findAll: `, this.#tasks);
    return this.#tasks;
  }

  save(task: Task): Promise<void> {
    const snapshot = task.snapshot();
    this.#tasks.push(snapshot);
    this.#logger.debug(`InMemoryTaskRepository.save: `, this.#tasks);

    return Promise.resolve();
  }

  update(task: Task): Promise<void> {
    return Promise.resolve(undefined);
  }
}

import { TaskRepository } from '../../../core/domain/repositories/task-repository';
import { Task } from '../../../core/domain/entities/task/task';
import { Logger } from '../../../core/domain/services/logger';
import TaskSnapshotType from '../../../core/domain/entities/task/types/taskSnapshot';
import { RecordNotFoundError } from '../../../core/domain/errors/record-not-found-error';

export class InMemoryTaskRepository implements TaskRepository {
  #tasks: TaskSnapshotType[] = [];
  #logger: Logger;

  constructor(logger: Logger) {
    this.#logger = logger;
  }

  async getById(id: string): Promise<Task> {
    const taskFound = this.#tasks.find(task => task.id === id);

    if (!taskFound) {
      throw new RecordNotFoundError(`Task with id ${id} not found`);
    }
    this.#logger.debug(`InMemoryTaskRepository.getById: `, taskFound);

    return Task.restore(taskFound);
  }

  async delete(id: string): Promise<void> {
    const taskFound = await this.getById(id);
    const taskSnapshot = taskFound.snapshot();

    this.#tasks = this.#tasks.filter(task => task.id !== taskSnapshot.id);
    this.#logger.debug(`InMemoryTaskRepository.delete: `, this.#tasks);

    return Promise.resolve();
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

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

  async getById(taskId: string): Promise<Task> {
    const taskFound = this.#tasks.find(task => task.id === taskId);

    if (!taskFound) {
      throw new RecordNotFoundError(`Task with id ${taskId} not found`);
    }
    this.#logger.debug(`InMemoryTaskRepository.getById: `, taskFound);

    return Task.restore(taskFound);
  }

  async delete(taskId: string): Promise<void> {
    const taskFound = await this.getById(taskId);
    const taskSnapshot = taskFound.snapshot();

    this.#tasks = this.#tasks.filter(task => task.id !== taskSnapshot.id);
    this.#logger.debug(`InMemoryTaskRepository.delete: `, this.#tasks);

    return Promise.resolve();
  }

  async findAll(): Promise<TaskSnapshotType[]> {
    this.#logger.debug(`InMemoryTaskRepository.findAll: `, this.#tasks);
    return this.#tasks;
  }

  save(taskToCreate: Task): Promise<void> {
    const snapshot = taskToCreate.snapshot();
    this.#tasks.push(snapshot);
    this.#logger.debug(`InMemoryTaskRepository.save: `, this.#tasks);

    return Promise.resolve();
  }

  update(taskToUpdate: TaskSnapshotType): Promise<void> {
    const index = this.#tasks.findIndex(task => task.id === taskToUpdate.id);
    this.#tasks[index] = taskToUpdate;
    this.#logger.debug(`InMemoryUserRepository.update: `, this.#tasks);

    return Promise.resolve();
  }
}

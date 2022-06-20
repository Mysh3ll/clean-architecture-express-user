import TaskStatus from '../../../core/domain/entities/task/types/task-status';
import { randomUUID } from 'crypto';
import { Task } from '../../../core/domain/entities/task/task';

export class TaskBuilder {
  #id: string | null = null;

  withId(id: string) {
    this.#id = id;

    return this;
  }

  build() {
    return new Task(
      this.#id || randomUUID(),
      'Test',
      'Test',
      TaskStatus.TODO,
      new Date(),
      new Date(),
      'test'
    );
  }
}

import TaskStatus from './types/task-status';
import TaskSnapshot from './types/taskSnapshot';

export class Task {
  #id: string;
  #title: string;
  #description: string;
  #status: TaskStatus;
  #createdAt: Date;
  #updatedAt: Date;
  #userId: string;

  constructor(
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
    createdAt: Date,
    updatedAt: Date,
    userId: string
  ) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#status = status;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#userId = userId;
  }

  snapshot() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      status: this.#status,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
      userId: this.#userId,
    };
  }

  static restore(snapshot: TaskSnapshot): Task {
    return new Task(
      snapshot.id,
      snapshot.title,
      snapshot.description,
      snapshot.status,
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.userId
    );
  }
}

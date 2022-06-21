import TaskStatus from './types/task-status';
import TaskSnapshot from './types/taskSnapshot';
import Assertion from '../../validation/assertion';
import TaskUpdateData from './types/taskUpdateData';
import TaskSnapshotType from './types/taskSnapshot';

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

    Assertion.notBlank(id, `Task: id must be provided`);
    Assertion.notBlank(title, `Task: title must be provided`);
    Assertion.maxLength(
      title,
      100,
      `Task: title must be less than 100 characters`
    );
    Assertion.notBlank(description, `Task: description must be provided`);
    Assertion.maxLength(
      description,
      1000,
      `Task: description must be less than 500 characters`
    );
    Assertion.isOneOf(
      status,
      Object.values(TaskStatus),
      `Task: status type attribute must be one of: ${Object.values(
        TaskStatus
      ).join(',')}`
    );
    Assertion.notBlank(
      createdAt.toString(),
      `Task: createdAt must be provided`
    );
    Assertion.notBlank(
      updatedAt.toString(),
      `Task: updatedAt must be provided`
    );
    Assertion.notBlank(userId, `Task: userId must be provided`);
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

  update(data: TaskUpdateData): TaskSnapshotType {
    return {
      id: this.#id,
      title: data.title ?? this.#title,
      description: data.description ?? this.#description,
      status: data.status ?? this.#status,
      createdAt: this.#createdAt,
      updatedAt: new Date(),
      userId: this.#userId,
    };
  }
}

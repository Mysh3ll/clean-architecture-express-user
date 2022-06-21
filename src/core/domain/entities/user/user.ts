import Assertion from '../../validation/assertion';
import UserSnapshotType from './types/userSnapshot';
import UserUpdateDataType from './types/userUpdateData';
import { Task } from '../task/task';
import TaskSnapshotType from '../task/types/taskSnapshot';

export class User {
  #id: string;
  #username: string;
  #email: string;
  #age: number | null;
  #tasks: Task[] | null;

  constructor(
    id: string,
    username: string,
    email: string,
    age: number | null,
    tasks: Task[] | null
  ) {
    this.#id = id;
    this.#username = username;
    this.#email = email;
    this.#age = age;
    this.#tasks = tasks;
    Assertion.notBlank(id, `User: id must be provided`);
    Assertion.notBlank(username, `User: username must be provided`);
    Assertion.notBlank(email, `User: email must be provided`);
    Assertion.isEmail(email, `User: email must be provided`);
    Assertion.isPositiveNumber(
      age,
      `User: age must be provided and must be a positive number`
    );
  }

  snapshot(): UserSnapshotType {
    return {
      id: this.#id,
      username: this.#username,
      email: this.#email,
      age: this.#age ?? null,
      tasks: this.#tasks?.map((task: Task) => task.snapshot()) ?? null,
    };
  }

  static restore(snapshot: UserSnapshotType): User {
    return new User(
      snapshot.id,
      snapshot.username,
      snapshot.email,
      snapshot.age ?? null,
      snapshot.tasks?.map((task: TaskSnapshotType) => Task.restore(task)) ??
        null
    );
  }

  update(data: UserUpdateDataType): UserSnapshotType {
    return {
      id: this.#id,
      username: data.username ?? this.#username,
      email: this.#email,
      age: data.age ?? this.#age,
      tasks: this.#tasks?.map((task: Task) => task.snapshot()) ?? null,
    };
  }

  addTask(task: Task): UserSnapshotType {
    return {
      id: this.#id,
      username: this.#username,
      email: this.#email,
      age: this.#age,
      // Add task to tasks array for current user
      tasks: [
        ...(this.#tasks?.map((task: Task) => task.snapshot()) ?? []),
        task.snapshot(),
      ],
    };
  }
}

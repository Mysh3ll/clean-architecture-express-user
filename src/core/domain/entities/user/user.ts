import Assertion from '../../validation/assertion';
import UserSnapshotType from './types/userSnapshot';
import UserUpdateDataType from './types/userUpdateData';

export class User {
  #id: string;
  #username: string;
  #email: string;
  #age: number | null;

  constructor(id: string, username: string, email: string, age: number | null) {
    this.#id = id;
    this.#username = username;
    this.#email = email;
    this.#age = age;
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
    };
  }

  static restore(snapshot: UserSnapshotType): User {
    return new User(
      snapshot.id,
      snapshot.username,
      snapshot.email,
      snapshot.age ?? null
    );
  }

  update(data: UserUpdateDataType): UserSnapshotType {
    return {
      id: this.#id,
      username: data.username ?? this.#username,
      email: this.#email,
      age: data.age ?? this.#age,
    };
  }
}

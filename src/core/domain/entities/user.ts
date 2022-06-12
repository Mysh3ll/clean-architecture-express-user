import Assertion from '../validation/assertion';

export interface UserSnapshot {
  id: string;
  username: string;
  email: string;
  age: number | null;
}

export class User {
  constructor(
    private id: string,
    private username: string,
    private email: string,
    private age: number | null
  ) {
    Assertion.notBlank(id, `User: id must be provided`);
    Assertion.notBlank(username, `User: username must be provided`);
    Assertion.notBlank(email, `User: email must be provided`);
    Assertion.isEmail(email, `User: email must be provided`);
    Assertion.isPositiveNumber(
      age,
      `User: age must be provided and must be a positive number`
    );
  }

  snapshot(): UserSnapshot {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      age: this.age ?? null,
    };
  }

  static restore(snapshot: UserSnapshot): User {
    return new User(
      snapshot.id,
      snapshot.username,
      snapshot.email,
      snapshot.age ?? null
    );
  }
}

import { User } from '../../../core/domain/entities/user/user';
import { randomUUID } from 'crypto';

export default class UserBuilder {
  private id: string | null = null;

  withId(id: string) {
    this.id = id;

    return this;
  }

  build() {
    return new User(
      this.id || randomUUID(),
      'Mysh3ll',
      'Mysh3ll@thetribe.io',
      41
    );
  }
}

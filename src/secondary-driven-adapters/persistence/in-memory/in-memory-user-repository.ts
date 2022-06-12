import { UserRepository } from '../../../core/domain/repositories/user-repository';
import { User, UserSnapshot } from '../../../core/domain/entities/user';
import { Logger } from '../../../core/domain/services/logger';
import { UserNotFoundError } from '../../../core/domain/errors/user-not-found-error';

export class InMemoryUserRepository implements UserRepository {
  private users: UserSnapshot[] = [];

  constructor(private readonly logger: Logger) {}

  async save(user: User): Promise<void> {
    const snapshot = user.snapshot();
    this.users.push(snapshot);
    this.logger.debug(`InMemoryUserRepository.save: `, this.users);

    return Promise.resolve();
  }

  async delete(id: string): Promise<void> {
    const userFound = await this.getById(id);
    this.users = this.users.filter(user => user.id !== userFound.id);
    this.logger.debug(`InMemoryUserRepository.delete: `, this.users);

    return Promise.resolve();
  }

  async findAll(): Promise<UserSnapshot[]> {
    this.logger.debug(`InMemoryUserRepository.findAll: `, this.users);

    return Promise.resolve(this.users);
  }

  async getById(id: string): Promise<UserSnapshot> {
    const user = this.users.find(user => user.id === id);
    this.logger.debug(`InMemoryUserRepository.getById: `, user);
    if (!user) {
      throw new UserNotFoundError();
    }

    return User.restore(user) as unknown as UserSnapshot;
  }

  async getByEmail(email: string): Promise<UserSnapshot | null> {
    const user = this.users.find(user => user.email === email);
    this.logger.debug(`InMemoryUserRepository.getByEmail: `, user);

    if (!user) {
      return null;
    }

    return User.restore(user) as unknown as UserSnapshot;
  }

  async update(user: User): Promise<void> {
    const snapshot = user.snapshot();
    const index = this.users.findIndex(user => user.id === snapshot.id);
    this.users[index] = snapshot;
    this.logger.debug(`InMemoryUserRepository.update: `, this.users);

    return Promise.resolve();
  }
}

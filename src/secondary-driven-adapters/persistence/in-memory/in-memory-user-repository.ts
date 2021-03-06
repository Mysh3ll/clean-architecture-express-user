import { UserRepository } from '../../../core/domain/repositories/user-repository';
import { User } from '../../../core/domain/entities/user/user';
import { Logger } from '../../../core/domain/services/logger';
import { RecordNotFoundError } from '../../../core/domain/errors/record-not-found-error';
import UserSnapshotType from '../../../core/domain/entities/user/types/userSnapshot';

export class InMemoryUserRepository implements UserRepository {
  private users: UserSnapshotType[] = [];

  constructor(private readonly logger: Logger) {}

  async save(user: User): Promise<void> {
    const snapshot = user.snapshot();
    this.users.push(snapshot);
    this.logger.debug(`InMemoryUserRepository.save: `, this.users);

    return Promise.resolve();
  }

  async delete(id: string): Promise<void> {
    const userFound = await this.getById(id);
    const userSnapshot = userFound.snapshot();
    this.users = this.users.filter(user => user.id !== userSnapshot.id);
    this.logger.debug(`InMemoryUserRepository.delete: `, this.users);

    return Promise.resolve();
  }

  async findAll(): Promise<UserSnapshotType[]> {
    this.logger.debug(`InMemoryUserRepository.findAll: `, this.users);

    return Promise.resolve(this.users);
  }

  async getById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);
    this.logger.debug(`InMemoryUserRepository.getById: `, user);
    if (!user) {
      throw new RecordNotFoundError('User not found');
    }

    return User.restore(user);
  }

  async getByEmail(email: string): Promise<UserSnapshotType | null> {
    const user = this.users.find(user => user.email === email);
    this.logger.debug(`InMemoryUserRepository.getByEmail: `, user);

    if (!user) {
      return null;
    }

    return User.restore(user) as unknown as UserSnapshotType;
  }

  async update(user: UserSnapshotType): Promise<void> {
    const index = this.users.findIndex(user => user.id === user.id);
    this.users[index] = user;
    this.logger.debug(`InMemoryUserRepository.update: `, this.users);

    return Promise.resolve();
  }
}

import { UserRepository } from '../../../core/domain/repositories/user-repository';
import { GetUserByIdUseCase } from '../../../core/use-cases/user/get-user-by-id-use-case';
import { InMemoryUserRepository } from '../../../secondary-driven-adapters/persistence/in-memory/in-memory-user-repository';
import { Logger } from '../../../core/domain/services/logger';
import { ConsoleLogger } from '../../../secondary-driven-adapters/services/console-logger';
import { RecordNotFoundError } from '../../../core/domain/errors/record-not-found-error';
import { User } from '../../../core/domain/entities/user/user';
import UserSnapshotType from '../../../core/domain/entities/user/types/userSnapshot';
import { user1, user1Id } from '../../fixtures/user-fixtures';

describe('Get User by Id', () => {
  let logger: Logger;
  let getUserByIdUseCase: GetUserByIdUseCase;
  let userRepository: UserRepository;

  beforeAll(() => {
    logger = new ConsoleLogger();
    userRepository = new InMemoryUserRepository(logger);
    getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
  });

  it('Should throw error when there is no available user', async () => {
    await expect(getUserByIdUseCase.execute('not_existing_id')).rejects.toThrow(
      RecordNotFoundError
    );
  });

  describe('Data loading', () => {
    beforeAll(() => {
      userRepository.save(user1);
    });

    it('Should return a User', async () => {
      // Arrange
      const user: User = await getUserByIdUseCase.execute(user1Id);
      const userSnapshot: UserSnapshotType = user.snapshot();

      // Act
      const expectedUserSnapshot: UserSnapshotType = user1.snapshot();

      // Assert
      expect(userSnapshot).toEqual(expectedUserSnapshot);
    });
  });
});

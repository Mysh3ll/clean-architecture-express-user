import { UserRepository } from '../../../core/domain/repositories/user-repository';
import { GetUserByIdUseCase } from '../../../core/use-cases/user/get-user-by-id-use-case';
import UserBuilder from '../../utils/builders/user-builder';
import { InMemoryUserRepository } from '../../../secondary-driven-adapters/persistence/in-memory/in-memory-user-repository';
import { Logger } from '../../../core/domain/services/logger';
import { ConsoleLogger } from '../../../secondary-driven-adapters/services/console-logger';
import { UserNotFoundError } from '../../../core/domain/errors/user-not-found-error';
import { User } from '../../../core/domain/entities/user/user';
import UserSnapshotType from '../../../core/domain/entities/user/types/userSnapshot';

describe('Get User by Id', () => {
  let logger: Logger;
  let getUserByIdUseCase: GetUserByIdUseCase;
  let userRepository: UserRepository;

  const userId = '123';
  const user1 = new UserBuilder().withId(userId).build();

  beforeAll(() => {
    logger = new ConsoleLogger();
    userRepository = new InMemoryUserRepository(logger);
    getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
  });

  it('should throw error when there is no available user', async () => {
    await expect(getUserByIdUseCase.execute('not_existing_id')).rejects.toThrow(
      UserNotFoundError
    );
  });

  describe('Data loading', () => {
    beforeAll(() => {
      userRepository.save(user1);
    });

    it('should return a User', async () => {
      // Arrange
      const user: User = await getUserByIdUseCase.execute(userId);
      const userSnapshot: UserSnapshotType = user.snapshot();

      // Act
      const expectedUserSnapshot: UserSnapshotType = user1.snapshot();

      // Assert
      expect(userSnapshot).toEqual(expectedUserSnapshot);
    });
  });
});

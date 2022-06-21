import { Logger } from '../../../core/domain/services/logger';
import { ConsoleLogger } from '../../../secondary-driven-adapters/services/console-logger';
import { TaskRepository } from '../../../core/domain/repositories/task-repository';
import { UserRepository } from '../../../core/domain/repositories/user-repository';
import { InMemoryTaskRepository } from '../../../secondary-driven-adapters/persistence/in-memory/in-memory-task-repository';
import { InMemoryUserRepository } from '../../../secondary-driven-adapters/persistence/in-memory/in-memory-user-repository';
import { user1, user1Id } from '../../fixtures/user-fixtures';
import { task1User1 } from '../../fixtures/task-fixtures';
import { AddUserTaskUseCase } from '../../../core/use-cases/task/add-user-task-use-case';

describe('Add User Task', () => {
  let logger: Logger;
  let taskRepository: TaskRepository;
  let userRepository: UserRepository;
  let addUserTaskUseCase: AddUserTaskUseCase;

  beforeAll(() => {
    logger = new ConsoleLogger();
    taskRepository = new InMemoryTaskRepository(logger);
    userRepository = new InMemoryUserRepository(logger);
    addUserTaskUseCase = new AddUserTaskUseCase(taskRepository, userRepository);
  });

  it('Should add a task for a user', async () => {
    // Arrange
    await userRepository.save(user1);
    await addUserTaskUseCase.execute(task1User1);

    // Act
    const firstUser = await userRepository.getById(user1Id);
    const firstUserSnapshot = firstUser.snapshot();

    // Assert
    expect(firstUserSnapshot).toHaveProperty('tasks');
    expect(firstUserSnapshot.tasks?.length).toBe(1);
    expect(firstUserSnapshot.tasks?.[0]).toStrictEqual(
      task1User1.task.snapshot()
    );
  });
});

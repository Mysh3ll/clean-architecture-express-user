import { Logger } from '../../../core/domain/services/logger';
import { ConsoleLogger } from '../../../secondary-driven-adapters/services/console-logger';
import { RecordNotFoundError } from '../../../core/domain/errors/record-not-found-error';
import { GetTaskByIdUseCase } from '../../../core/use-cases/task/get-task-by-id-use-case';
import { InMemoryTaskRepository } from '../../../secondary-driven-adapters/persistence/in-memory/in-memory-task-repository';
import { TaskRepository } from '../../../core/domain/repositories/task-repository';
import { task1, tasks } from '../../fixtures/task';
import { Task } from '../../../core/domain/entities/task/task';
import TaskSnapshotType from '../../../core/domain/entities/task/types/taskSnapshot';

describe('Get Task by Id', () => {
  let logger: Logger;
  let getTaskByIdUseCase: GetTaskByIdUseCase;
  let taskRepository: TaskRepository;

  beforeAll(() => {
    logger = new ConsoleLogger();
    taskRepository = new InMemoryTaskRepository(logger);
    getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository);
  });

  describe('Errors', () => {
    it('Should throw a RecordNotFoundError when the task does not exist', async () => {
      // Arrange
      const taskId = 'task-id-that-does-not-exist';

      // Act
      const action = () => getTaskByIdUseCase.execute(taskId);

      // Assert
      await expect(action()).rejects.toThrow(
        new RecordNotFoundError(`Task with id ${taskId} not found`)
      );
    });
  });

  describe('Data loading', () => {
    beforeAll(() => {
      tasks.map(async task => await taskRepository.save(task));
    });

    it('Should return a Task', async () => {
      // Arrange
      const task: Task = await getTaskByIdUseCase.execute(task1.snapshot().id);
      const taskSnapshot: TaskSnapshotType = task.snapshot();

      // Act
      const expectedTaskSnapshot: TaskSnapshotType = task1.snapshot();

      // Assert
      expect(taskSnapshot).toEqual(expectedTaskSnapshot);
    });
  });
});

import { Logger } from '../../../core/domain/services/logger';
import { TaskRepository } from '../../../core/domain/repositories/task-repository';
import { ConsoleLogger } from '../../../secondary-driven-adapters/services/console-logger';
import { InMemoryTaskRepository } from '../../../secondary-driven-adapters/persistence/in-memory/in-memory-task-repository';
import TaskSnapshotType from '../../../core/domain/entities/task/types/taskSnapshot';
import { task1, task2, task3, tasks } from '../../fixtures/task';
import { RecordNotFoundError } from '../../../core/domain/errors/record-not-found-error';
import { DeleteTaskUseCase } from '../../../core/use-cases/task/delete-task-use-case';

describe('Delete task', () => {
  let logger: Logger;
  let deleteTaskUseCase: DeleteTaskUseCase;
  let taskRepository: TaskRepository;

  beforeAll(async () => {
    logger = new ConsoleLogger();
    taskRepository = new InMemoryTaskRepository(logger);
    deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  });

  describe('Errors', () => {
    it('Should throw a RecordNotFoundError when the task does not exist', async () => {
      // Arrange
      const taskId = 'task-id-that-does-not-exist';

      // Act
      const action = () => deleteTaskUseCase.execute(taskId);

      // Assert
      await expect(action()).rejects.toThrow(
        new RecordNotFoundError(`Task with id ${taskId} not found`)
      );
    });
  });

  describe('Data loading', () => {
    beforeAll(() => {
      tasks.map(task => taskRepository.save(task));
    });

    it('Should delete a task', async () => {
      // Arrange
      await deleteTaskUseCase.execute(task1.snapshot().id);
      const tasksSnapshot = await taskRepository.findAll();

      // Act
      const expectedTasksSnapshot: TaskSnapshotType[] = [
        task2.snapshot(),
        task3.snapshot(),
      ];

      // Assert
      expect(tasksSnapshot).toEqual(expectedTasksSnapshot);
      expect(tasksSnapshot.length).toEqual(expectedTasksSnapshot.length);
    });
  });
});

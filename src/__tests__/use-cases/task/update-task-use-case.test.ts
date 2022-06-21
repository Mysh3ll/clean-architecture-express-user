import { Logger } from '../../../core/domain/services/logger';
import { TaskRepository } from '../../../core/domain/repositories/task-repository';
import { UpdateTaskUseCase } from '../../../core/use-cases/task/update-task-use-case';
import { ConsoleLogger } from '../../../secondary-driven-adapters/services/console-logger';
import { InMemoryTaskRepository } from '../../../secondary-driven-adapters/persistence/in-memory/in-memory-task-repository';
import TaskUpdateDataType from '../../../core/domain/entities/task/types/taskUpdateData';
import {
  task1,
  taskAddPayload,
  tasks,
  taskUpdatePayload,
} from '../../fixtures/task';
import { RecordNotFoundError } from '../../../core/domain/errors/record-not-found-error';

describe('Update Task', () => {
  let logger: Logger;
  let updateTaskUseCase: UpdateTaskUseCase;
  let taskRepository: TaskRepository;

  beforeAll(() => {
    logger = new ConsoleLogger();
    taskRepository = new InMemoryTaskRepository(logger);
    updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
  });

  describe('Errors', () => {
    it('Should throw error when there is no available task', async () => {
      // Arrange
      const taskUpdateData: TaskUpdateDataType = {
        ...taskAddPayload,
        id: '',
      };
      // Act
      const action = () => updateTaskUseCase.execute(taskUpdateData);

      // Assert
      await expect(action()).rejects.toThrow(RecordNotFoundError);
    });
  });

  describe('Data persistence', () => {
    beforeAll(() => {
      tasks.map(async task => await taskRepository.save(task));
    });

    it('Should update a task', async () => {
      // Arrange
      const taskUpdateData: TaskUpdateDataType = {
        ...taskUpdatePayload,
        id: task1.snapshot().id,
      };
      // Act
      await updateTaskUseCase.execute(taskUpdateData);
      const expectedTask = await taskRepository.getById(task1.snapshot().id);

      // Assert
      expect(taskUpdateData.title).toEqual(expectedTask.snapshot().title);
      expect(taskUpdateData.description).toEqual(
        expectedTask.snapshot().description
      );
      expect(taskUpdateData.status).toEqual(expectedTask.snapshot().status);
    });
  });
});

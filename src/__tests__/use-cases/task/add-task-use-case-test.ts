import { Logger } from '../../../core/domain/services/logger';
import { AddTaskUseCase } from '../../../core/use-cases/task/add-task-use-case';
import { TaskRepository } from '../../../core/domain/repositories/task-repository';
import { ConsoleLogger } from '../../../secondary-driven-adapters/services/console-logger';
import { InMemoryTaskRepository } from '../../../secondary-driven-adapters/persistence/in-memory/in-memory-task-repository';
import { taskAddPayload } from '../../fixtures/task';
import { InvalidArgumentError } from '../../../core/domain/errors/invalid-argument-error';
import TaskAddDataType from '../../../core/domain/entities/task/types/taskAddData';
import { UuidGenerator } from '../../../secondary-driven-adapters/services/uuid-generator';
import TaskSnapshotType from '../../../core/domain/entities/task/types/taskSnapshot';

describe('Add Task', () => {
  let logger: Logger;
  let uuidGenerator: UuidGenerator;
  let addTaskUseCase: AddTaskUseCase;
  let taskRepository: TaskRepository;

  beforeAll(() => {
    logger = new ConsoleLogger();
    uuidGenerator = new UuidGenerator();
    taskRepository = new InMemoryTaskRepository(logger);
    addTaskUseCase = new AddTaskUseCase(taskRepository, uuidGenerator);
  });

  afterEach(async () => {
    //delete all tasks
    const tasks = await taskRepository.findAll();
    for (const task of tasks) {
      await taskRepository.delete(task.id);
    }
  });

  describe('Errors', () => {
    [
      { key: 'title', value: '' },
      {
        key: 'title',
        value: 'a'.repeat(101),
      },
      { key: 'description', value: '' },
      {
        key: 'description',
        value: 'a'.repeat(1001),
      },
      { key: 'status', value: '' },
      {
        key: 'status',
        value: 'UNKNOWN',
      },
      { key: 'createdAt', value: '' },
      { key: 'createdAt', value: '12-12-12' },
      { key: 'updatedAt', value: '' },
      { key: 'updatedAt', value: '12.12.12' },
      { key: 'userId', value: '' },
      { key: 'userId', value: 1 },
    ].forEach(({ key, value }) => {
      it(`Should throw error when task has invalid ${key}`, async () => {
        // Arrange
        const newTask: TaskAddDataType = { ...taskAddPayload, [key]: value };

        // Act
        const action = () => addTaskUseCase.execute({ ...newTask });

        // Assert
        await expect(action()).rejects.toThrow(InvalidArgumentError);
      });
    });
  });

  describe('Data persistence', () => {
    it('Should save a task', async () => {
      // Arrange
      await addTaskUseCase.execute({ ...taskAddPayload });

      // Act
      const tasks: TaskSnapshotType[] = await taskRepository.findAll();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...firstTask } = tasks[0];

      // Assert
      expect(tasks.length).toBe(1);
      expect(firstTask).toStrictEqual(taskAddPayload);
    });

    it('Should add a task with a new id', async () => {
      // Arrange
      await addTaskUseCase.execute({ ...taskAddPayload });

      // Act
      const tasks: TaskSnapshotType[] = await taskRepository.findAll();
      const { id, ...firstTask } = tasks[0];

      // Assert
      expect(tasks.length).toBe(1);
      expect(firstTask).toStrictEqual(taskAddPayload);
      expect(id).toBeDefined();
    });
  });
});

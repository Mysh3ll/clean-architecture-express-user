import { Logger } from '../../../core/domain/services/logger';
import { GetTaskUseCase } from '../../../core/use-cases/task/get-task-use-case';
import { TaskRepository } from '../../../core/domain/repositories/task-repository';
import { ConsoleLogger } from '../../../secondary-driven-adapters/services/console-logger';
import { InMemoryTaskRepository } from '../../../secondary-driven-adapters/persistence/in-memory/in-memory-task-repository';
import { Task } from '../../../core/domain/entities/task/task';
import TaskSnapshotType from '../../../core/domain/entities/task/types/taskSnapshot';
import { tasks } from '../../fixtures/task';

describe('Get task', () => {
  let logger: Logger;
  let getTaskUseCase: GetTaskUseCase;
  let taskRepository: TaskRepository;

  beforeAll(() => {
    logger = new ConsoleLogger();
    taskRepository = new InMemoryTaskRepository(logger);
    getTaskUseCase = new GetTaskUseCase(taskRepository);
  });

  it('Should return nothing when there are no tasks', async () => {
    // Arrange
    const tasksSnapshot: TaskSnapshotType[] = await getTaskUseCase.execute();

    // Act
    const expectedTasks: Task[] = [];

    // Assert
    expect(tasksSnapshot).toEqual(expectedTasks);
  });

  it('Should return a list of tasks', async () => {
    // Arrange
    tasks.map(async task => await taskRepository.save(task));
    const tasksSnapshot: TaskSnapshotType[] = await getTaskUseCase.execute();

    // Act
    const expectedTasksSnapshot: TaskSnapshotType[] = tasks.map(task =>
      task.snapshot()
    );

    // Assert
    expect(tasksSnapshot).toEqual(expectedTasksSnapshot);
    expect(tasksSnapshot.length).toEqual(expectedTasksSnapshot.length);
  });
});

import { Logger } from '../../../core/domain/services/logger';
import { GetTaskUseCase } from '../../../core/use-cases/task/get-task-use-case';
import { TaskRepository } from '../../../core/domain/repositories/task-repository';
import { ConsoleLogger } from '../../../secondary-driven-adapters/services/console-logger';
import { InMemoryTaskRepository } from '../../../secondary-driven-adapters/persistence/in-memory/in-memory-task-repository';
import { TaskBuilder } from '../../utils/builders/task-builder';
import { Task } from '../../../core/domain/entities/task/task';
import TaskSnapshotType from '../../../core/domain/entities/task/types/taskSnapshot';

describe('Get task', () => {
  let logger: Logger;
  let getTaskUseCase: GetTaskUseCase;
  let taskRepository: TaskRepository;

  const task1 = new TaskBuilder().withId('123').build();
  const task2 = new TaskBuilder().withId('456').build();
  const task3 = new TaskBuilder().withId('789').build();
  const tasks = [task1, task2, task3];

  beforeAll(() => {
    logger = new ConsoleLogger();
    taskRepository = new InMemoryTaskRepository(logger);
    getTaskUseCase = new GetTaskUseCase(taskRepository);
  });

  it('should return nothing when there are no tasks', async () => {
    // Arrange
    const tasksSnapshot: TaskSnapshotType[] = await getTaskUseCase.execute();

    // Act
    const expectedTasks: Task[] = [];

    // Assert
    expect(tasksSnapshot).toEqual(expectedTasks);
  });

  it('should return a list of tasks', async () => {
    // Arrange
    tasks.map(task => taskRepository.save(task));
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

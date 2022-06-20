import { TaskBuilder } from '../utils/builders/task-builder';
import TaskAddDataType from '../../core/domain/entities/task/types/taskAddData';
import TaskStatusEnum from '../../core/domain/entities/task/types/task-status';

export const task1 = new TaskBuilder().withId('123').build();
export const task2 = new TaskBuilder().withId('456').build();
export const task3 = new TaskBuilder().withId('789').build();
export const tasks = [task1, task2, task3];

export const task1Payload: TaskAddDataType = {
  title: 'Task 1',
  description: 'Task 1 description',
  status: TaskStatusEnum.TODO,
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: '123',
};

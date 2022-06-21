import { TaskBuilder } from '../utils/builders/task-builder';
import TaskAddDataType from '../../core/domain/entities/task/types/taskAddData';
import TaskStatusEnum from '../../core/domain/entities/task/types/task-status';
import TaskUpdateDataType from '../../core/domain/entities/task/types/taskUpdateData';
import { user1Id } from './user-fixtures';
import TaskAddToUserDataType from '../../core/domain/entities/task/types/taskAddToUserData';

export const task1Id = '123';
export const task1 = new TaskBuilder().withId(task1Id).build();
export const task2 = new TaskBuilder().withId('456').build();
export const task3 = new TaskBuilder().withId('789').build();
export const tasks = [task1, task2, task3];

export const taskAddPayload: TaskAddDataType = {
  title: 'Task 1',
  description: 'Task 1 description',
  status: TaskStatusEnum.TODO,
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: user1Id,
};

export const taskUpdatePayload: TaskUpdateDataType = {
  id: '',
  title: 'Task Updated',
  description: 'Task 1 Updated description',
  status: TaskStatusEnum.DONE,
};

export const task1User1: TaskAddToUserDataType = {
  userId: user1Id,
  task: task1,
};

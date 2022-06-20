import { TaskBuilder } from '../utils/builders/task-builder';

export const task1 = new TaskBuilder().withId('123').build();
export const task2 = new TaskBuilder().withId('456').build();
export const task3 = new TaskBuilder().withId('789').build();
export const tasks = [task1, task2, task3];

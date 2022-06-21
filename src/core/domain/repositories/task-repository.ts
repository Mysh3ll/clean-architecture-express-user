import { Task } from '../entities/task/task';
import TaskSnapshotType from '../entities/task/types/taskSnapshot';

export interface TaskRepository {
  getById(id: string): Promise<Task>;
  findAll(): Promise<TaskSnapshotType[]>;
  delete(id: string): Promise<void>;
  save(task: Task): Promise<void>;
  update(task: TaskSnapshotType): Promise<void>;
}

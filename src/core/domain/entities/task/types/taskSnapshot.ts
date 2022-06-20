import TaskStatus from './task-status';

type TaskSnapshotType = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: TaskStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly userId: string;
};

export default TaskSnapshotType;

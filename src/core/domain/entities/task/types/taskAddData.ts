import TaskStatus from './task-status';

type TaskAddDataType = {
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export default TaskAddDataType;

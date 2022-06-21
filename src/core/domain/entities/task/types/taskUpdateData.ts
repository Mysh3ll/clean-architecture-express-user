import TaskStatus from './task-status';

type TaskUpdateDataType = {
  id: string;
  title?: string;
  description?: string;
  status: TaskStatus;
};

export default TaskUpdateDataType;

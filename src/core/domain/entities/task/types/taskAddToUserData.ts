import { Task } from '../task';

type TaskAddToUserDataType = {
  readonly userId: string;
  readonly task: Task;
};

export default TaskAddToUserDataType;

import TaskSnapshotType from '../../task/types/taskSnapshot';

type UserSnapshotType = {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly age: number | null;
  readonly tasks: TaskSnapshotType[] | null;
};

export default UserSnapshotType;

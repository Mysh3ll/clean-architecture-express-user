import { User } from '../entities/user/user';
import UserSnapshotType from '../entities/user/types/userSnapshot';

export interface UserRepository {
  getById(id: string): Promise<User>;
  getByEmail(email: string): Promise<UserSnapshotType | null>;
  findAll(): Promise<UserSnapshotType[]>;
  delete(id: string): Promise<void>;
  save(user: User): Promise<void>;
  update(user: UserSnapshotType): Promise<void>;
}

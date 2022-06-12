import { User, UserSnapshot } from '../entities/user';

export interface UserRepository {
  getById(id: string): Promise<UserSnapshot>;
  getByEmail(email: string): Promise<UserSnapshot | null>;
  findAll(): Promise<UserSnapshot[]>;
  delete(id: string): Promise<void>;
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
}

import { UserRepository } from '../domain/repositories/user-repository';
import { User } from '../domain/entities/user/user';

export interface GetUserByIdUseCaseInterface {
  execute(id: string): Promise<User>;
}

export class GetUserByIdUseCase implements GetUserByIdUseCaseInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    return this.userRepository.getById(id);
  }
}

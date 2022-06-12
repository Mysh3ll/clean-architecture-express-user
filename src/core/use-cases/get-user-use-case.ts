import { UserSnapshot } from '../domain/entities/user';
import { UserRepository } from '../domain/repositories/user-repository';

export interface GetUserUseCaseInterface {
  execute(): Promise<UserSnapshot[]>;
}

export class GetUserUseCase implements GetUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserSnapshot[]> {
    return this.userRepository.findAll();
  }
}

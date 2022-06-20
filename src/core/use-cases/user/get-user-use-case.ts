import { UserRepository } from '../../domain/repositories/user-repository';
import UserSnapshotType from '../../domain/entities/user/types/userSnapshot';

export interface GetUserUseCaseInterface {
  execute(): Promise<UserSnapshotType[]>;
}

export class GetUserUseCase implements GetUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserSnapshotType[]> {
    return this.userRepository.findAll();
  }
}

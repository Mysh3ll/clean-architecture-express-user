import { UserRepository } from '../../domain/repositories/user-repository';
import UserDeleteDataType from '../../domain/entities/user/types/userDeleteData';

export interface DeleteUserUseCaseInterface {
  execute(deleteUserData: UserDeleteDataType): Promise<void>;
}

export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(deleteUserData: UserDeleteDataType): Promise<void> {
    await this.userRepository.delete(deleteUserData.id);
  }
}

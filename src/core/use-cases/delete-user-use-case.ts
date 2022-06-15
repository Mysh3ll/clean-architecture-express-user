import { UserRepository } from '../domain/repositories/user-repository';
import { DeleteUserData } from '../domain/entities/user';

export interface DeleteUserUseCaseInterface {
  execute(deleteUserData: DeleteUserData): Promise<void>;
}

export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(deleteUserData: DeleteUserData): Promise<void> {
    await this.userRepository.delete(deleteUserData.id);
  }
}

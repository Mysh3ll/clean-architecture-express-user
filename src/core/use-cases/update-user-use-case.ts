import { UpdateUserData, User, UserSnapshot } from '../domain/entities/user';
import { UserRepository } from '../domain/repositories/user-repository';

export interface UpdateUserUseCaseInterface {
  execute(updateUserData: UpdateUserData): Promise<void>;
}

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(updateUserData: UpdateUserData): Promise<void> {
    const userFound: UserSnapshot = await this.userRepository.getById(
      updateUserData.id
    );
    const userData: User = User.update(userFound, updateUserData);

    await this.userRepository.update(userData);
  }
}

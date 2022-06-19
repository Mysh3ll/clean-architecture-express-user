import { User } from '../domain/entities/user/user';
import { UserRepository } from '../domain/repositories/user-repository';
import UserUpdateDataType from '../domain/entities/user/types/userUpdateData';
import UserSnapshotType from '../domain/entities/user/types/userSnapshot';

export interface UpdateUserUseCaseInterface {
  execute(updateUserData: UserUpdateDataType): Promise<void>;
}

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(updateUserData: UserUpdateDataType): Promise<void> {
    const userFound: UserSnapshotType = await this.userRepository.getById(
      updateUserData.id
    );
    const userUpdated: UserSnapshotType =
      User.restore(userFound).update(updateUserData);

    await this.userRepository.update(userUpdated);
  }
}

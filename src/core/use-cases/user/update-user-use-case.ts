import { UserRepository } from '../../domain/repositories/user-repository';
import UserUpdateDataType from '../../domain/entities/user/types/userUpdateData';
import UserSnapshotType from '../../domain/entities/user/types/userSnapshot';
import { User } from '../../domain/entities/user/user';

export interface UpdateUserUseCaseInterface {
  execute(updateUserData: UserUpdateDataType): Promise<void>;
}

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(updateUserData: UserUpdateDataType): Promise<void> {
    const userFound: User = await this.userRepository.getById(
      updateUserData.id
    );
    const userFoundSnapshot: UserSnapshotType = userFound.snapshot();
    const userUpdated: UserSnapshotType =
      User.restore(userFoundSnapshot).update(updateUserData);

    await this.userRepository.update(userUpdated);
  }
}

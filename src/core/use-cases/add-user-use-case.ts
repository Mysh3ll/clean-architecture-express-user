import { User } from '../domain/entities/user/user';
import { UserRepository } from '../domain/repositories/user-repository';
import { IdGenerator } from '../domain/services/id-generator';
import { UserAlreadyExistsError } from '../domain/errors/user-already-exists-error';
import UserAddDataType from '../domain/entities/user/types/userAddData';
import UserSnapshotType from '../domain/entities/user/types/userSnapshot';

export interface AddUserUseCaseInterface {
  execute(addUserData: UserAddDataType): Promise<void>;
}

export class AddUserUseCase implements AddUserUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  async execute(addUserData: UserAddDataType): Promise<void> {
    const user: User = new User(
      this.idGenerator.generate(),
      addUserData.username,
      addUserData.email,
      addUserData.age ?? null
    );

    const existingUser: UserSnapshotType | null =
      await this.userRepository.getByEmail(addUserData.email);
    if (existingUser) {
      throw new UserAlreadyExistsError(
        `User already exists with email: ${addUserData.email}`
      );
    }

    await this.userRepository.save(user);
  }
}

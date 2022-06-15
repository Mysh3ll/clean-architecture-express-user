import { AddUserData, User, UserSnapshot } from '../domain/entities/user';
import { UserRepository } from '../domain/repositories/user-repository';
import { IdGenerator } from '../domain/services/id-generator';
import { UserAlreadyExistsError } from '../domain/errors/user-already-exists-error';

export interface AddUserUseCaseInterface {
  execute(addUserData: AddUserData): Promise<void>;
}

export class AddUserUseCase implements AddUserUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  async execute(addUserData: AddUserData): Promise<void> {
    const user: User = new User(
      this.idGenerator.generate(),
      addUserData.username,
      addUserData.email,
      addUserData.age ?? null
    );

    const existingUser: UserSnapshot | null =
      await this.userRepository.getByEmail(addUserData.email);
    if (existingUser) {
      throw new UserAlreadyExistsError(
        `User already exists with email: ${addUserData.email}`
      );
    }

    await this.userRepository.save(user);
  }
}

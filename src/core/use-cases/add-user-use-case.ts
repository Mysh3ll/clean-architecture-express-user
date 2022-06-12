import { User } from '../domain/entities/user';
import { UserRepository } from '../domain/repositories/user-repository';
import { IdGenerator } from '../domain/services/id-generator';
import { UserAlreadyExistsError } from '../domain/errors/user-already-exists-error';

export interface AddUserDto {
  username: string;
  email: string;
  age: number | null;
}

export interface AddUserUseCaseInterface {
  execute(addUserDto: AddUserDto): Promise<void>;
}

export class AddUserUseCase implements AddUserUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  async execute(addUserDto: AddUserDto): Promise<void> {
    const user = new User(
      this.idGenerator.generate(),
      addUserDto.username,
      addUserDto.email,
      addUserDto.age ?? null
    );

    const existingUser = await this.userRepository.getByEmail(addUserDto.email);
    if (existingUser) {
      throw new UserAlreadyExistsError(
        `User already exists with email: ${addUserDto.email}`
      );
    }

    await this.userRepository.save(user);
  }
}

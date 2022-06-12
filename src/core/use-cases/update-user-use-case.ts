import { User } from '../domain/entities/user';
import { UserRepository } from '../domain/repositories/user-repository';

export interface UpdateUserDto {
  id: string;
  username?: string;
  age?: number;
}

export interface UpdateUserUseCaseInterface {
  execute(updateUserDto: UpdateUserDto): Promise<void>;
}

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(updateUserDto: UpdateUserDto): Promise<void> {
    const userFound = await this.userRepository.getById(updateUserDto.id);
    const user = new User(
      updateUserDto.id,
      updateUserDto.username ?? userFound.username,
      userFound.email,
      updateUserDto.age ?? userFound.age
    );

    await this.userRepository.update(user);
  }
}

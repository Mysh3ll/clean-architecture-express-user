import { UserRepository } from '../domain/repositories/user-repository';

export interface DeleteUserDto {
  id: string;
}

export interface DeleteUserUseCaseInterface {
  execute(deleteUserDto: DeleteUserDto): Promise<void>;
}

export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(deleteUserDto: DeleteUserDto): Promise<void> {
    await this.userRepository.delete(deleteUserDto.id);
  }
}

import TaskAddToUserDataType from '../../domain/entities/task/types/taskAddToUserData';
import { TaskRepository } from '../../domain/repositories/task-repository';
import { UserRepository } from '../../domain/repositories/user-repository';

export interface AddUserTaskUseCaseInterface {
  execute(UserTask: TaskAddToUserDataType): Promise<void>;
}

export class AddUserTaskUseCase implements AddUserTaskUseCaseInterface {
  #taskRepository: TaskRepository;
  #userRepository: UserRepository;

  constructor(taskRepository: TaskRepository, userRepository: UserRepository) {
    this.#taskRepository = taskRepository;
    this.#userRepository = userRepository;
  }

  async execute(UserTask: TaskAddToUserDataType): Promise<void> {
    const { userId, task } = UserTask;
    const userFound = await this.#userRepository.getById(userId);
    const userUpdatedWithTask = userFound.addTask(task);

    await this.#userRepository.update(userUpdatedWithTask);
  }
}

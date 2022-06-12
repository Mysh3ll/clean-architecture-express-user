export class UserAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message ?? 'User already exists');
    this.name = 'user_already_exists_error';
  }
}

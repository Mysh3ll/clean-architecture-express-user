export class UserNotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'User not found');
    this.name = 'user_not_found';
  }
}

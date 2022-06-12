export class InvalidArgumentError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid argument');
    this.name = 'invalid_argument';
  }
}

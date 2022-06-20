export class RecordNotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'Record not found');
    this.name = 'record_not_found';
  }
}

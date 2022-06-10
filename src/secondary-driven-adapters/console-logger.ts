import { Logger } from '../core/domain/logger';

export class ConsoleLogger implements Logger {
  debug(message: string, ...optionalParams: unknown[]): void {
    // eslint-disable-next-line no-console
    console.debug(`[Debug] ${message}`, ...optionalParams);
  }

  info(message: string, ...optionalParams: unknown[]): void {
    // eslint-disable-next-line no-console
    console.log(`[Info]  ${message}`, ...optionalParams);
  }

  error(message: string, ...optionalParams: unknown[]): void {
    console.error(`[Error] ${message}`, ...optionalParams);
  }
}

import { InvalidArgumentError } from '../errors/invalid-argument-error';

export default class Assertion {
  static notBlank(value: string | null, msg: string | null = null): void {
    if (value === null || (value || '').trim() === '') {
      throw new InvalidArgumentError(msg ?? 'Value can not be empty');
    }
  }

  static isPositiveNumber = (
    value: number | string | null,
    msg: string | null = null
  ): void => {
    const valueNumber = Number(value);

    if (isNaN(valueNumber) || valueNumber < 0) {
      throw new InvalidArgumentError(msg ?? 'Value is not a valid number');
    }
  };

  static isEmail = (value: string | null, msg: string | null = null): void => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '')) {
      throw new InvalidArgumentError(msg ?? 'Value is not a valid email');
    }
  };

  static maxLength = (
    value: string | null,
    maxLength: number,
    msg: string | null = null
  ): void => {
    if (value && value.length > maxLength) {
      throw new InvalidArgumentError(
        msg ?? `Value must be less than ${maxLength} characters`
      );
    }
  };

  static isOneOf = (
    value: string,
    availableValues: string[],
    msg: string | null = null
  ): void => {
    if (!availableValues.includes(value)) {
      throw new InvalidArgumentError(msg ?? 'Value is not allowed');
    }
  };
}

import { IdGenerator } from '../../core/domain/services/id-generator';
import { v4 as uuidv4 } from 'uuid';

export class UuidGenerator implements IdGenerator {
  generate(): string {
    return uuidv4();
  }
}

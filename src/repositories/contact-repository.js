import contact from '../entities/contact';
import {Repository} from './repository';

const modelName = 'Contact';

/**
 * ContactRepository class
 */
export class ContactRepository extends Repository {
  /**
   * Constructor method
   */
  constructor() {
    super();
    this.em.loadEntity(modelName, contact);
  }
}

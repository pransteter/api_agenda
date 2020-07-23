import contact from '../entities/contact';
import { Repository } from './repository';

const modelName = 'Contact';

export class ContactRepository extends Repository {
    /**
     * Constructor method
     */
    constructor() {
        super();
        this.em.loadEntity(modelName, contact);
    }
}

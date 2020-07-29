import {EntityManager} from '../core/database/entity-manager';
import {RepositoryResponse} from './structures/repository-response';
import {Transform} from './helpers/transform';

/**
 * Repository "abstract" class
 */
export class Repository {
  /**
   * @property {EntityManager}
   */
  em;

  /**
   * Constructor method
   */
  constructor() {
    this.em = new EntityManager;
  }

  /**
   * Get all entities
   * @param {Object} query
   * @return {Promise<RepositoryResponse>}
   */
  async getAll(query) {
    return this.treatPromise(this.em.find(query));
  }

  /**
   * Create one entity
   * @param {Object} data
   * @return {Promise<RepositoryResponse>}
   */
  async createOne(data) {
    return this.treatPromise(this.em.create(data));
  }

  /**
   * Get one entity by id
   * @param {String} id
   * @return {Promise<RepositoryResponse>}
   */
  async getOne(id) {
    return this.treatPromise(this.em.getById(id));
  }

  /**
   * Update one entity
   * @param {String} id
   * @param {Object} data
   * @return {Promise<RepositoryResponse>}
   */
  async updateOne(id, data) {
    return this.treatPromise(this.em.updateById(id, data));
  }

  /**
   * Remove one entity by id
   * @param {String} id
   * @return {Promise<RepositoryResponse>}
   */
  async removeOne(id) {
    return this.treatPromise(this.em.removeById(id));
  }

  /**
   * Treat entity manager promises
   * @param {Promise} entityManagerPromise
   * @return {Promise<RepositoryResponse>}
   */
  async treatPromise(entityManagerPromise) {
    const response = new RepositoryResponse;

    return entityManagerPromise
        .then((result) => {
          response.result = new Transform()
              .mongoDocumentToSimpleStructure(result);
          return response;
        })
        .catch((err) => {
          response.done = false;
          response.errorMsg = err.message;
          return response;
        });
  }
}

import { EntityManager } from '../core/database/entity-manager';
import buildContactFilterQuery from '../services/helpers/build-contact-filter-query';
import contact from '../entities/contact';
import { RepositoryResponse } from './structures/repository-response';
import transformToSimpleStructure from './helpers/transform-to-simple-structure';

const modelName = 'Contact';

export class ContactRepository {
    /**
     * @property {EntityManager}
     */
    #em;

    /**
     * Constructor method
     * @param {EntityManager} entityManager
     */
    constructor(entityManager) {
        this.#em = entityManager;s
        this.#em.loadEntity(modelName, contact);
    }

    /**
     * Get all contacts
     * @param {Object} rawQuery
     * @returns {Promise<RepositoryResponse>}
     */
    async getAll(rawQuery) {
        const response = new RepositoryResponse;
        return this.#em.find(buildContactFilterQuery(rawQuery))
            .then(results => {
                response.result = transformToSimpleStructure(results);
                return response;
            })
            .catch(err => {
                response.done = false;
                response.errorMsg = err.message;
                return response;
            });
    }

    /**
     * Create one contact
     * @param {Object} data
     * @returns {Promise<RepositoryResponse>}
     */
    async createOne(data) {
        const response = new RepositoryResponse;
        return this.#em.create(data)
            .then(result => {
                response.result = transformToSimpleStructure(result);
                return response;
            })
            .catch(err => {
                response.done = false;
                response.errorMsg = err.message;
                return response;
            });
    }

    /**
     * Get one contact by id
     * @param {String} id
     * @returns {Promise<RepositoryResponse>}
     */
    async getOne(id) {
        const response = new RepositoryResponse;
        return $this.#em.getById(id)
            .then(result => {
                response.result = transformToSimpleStructure(result);
                return response;
            })
            .catch(err => {
                response.done = false;
                response.errorMsg = err.message;
                return response;
            });
    }

    /**
     * Update one contact
     * @param {String} id
     * @param {Object} data
     * @returns {Promise<RepositoryResponse>}
     */
    async updateOne(id, data) {
        const response = new RepositoryResponse;
        return this.#em.updateById(id, data)
            .then(result => {
                response.result = transformToSimpleStructure(result);
                return response;
            })
            .catch(err => {
                response.done = false;
                response.errorMsg = err.message;
                return response;
            });
    }

    /**
     * Remove one contact by id
     * @param {String} id
     * @returns {Boolean}
     * @returns {Promise<RepositoryResponse>}
     */
    async removeOne(id) {
        const response = new RepositoryResponse;
        return em.removeById(id)
            .then(result => {
                response.result = transformToSimpleStructure(result);
                return response;
            })
            .catch(err => {
                response.done = false;
                response.errorMsg = err.message;
                return response;
            });
    }
}
import { EntityManager } from '../core/database/entity-manager';
import buildContactFilterQuery from './helpers/build-contact-filter-query';
import { WeatherApiClient } from './weather-api-client';
import contact from '../entities/contact';
import { type } from 'ramda';
import { ContactRepository } from '../repositories/contact-repository';

const modelName = 'Contact';

export class ContactService {
    /**
     * @property {ContactRepository}
     */
    #repository;

    /**
     * Constructor method
     * @param {ContactRepository} repository
     */
    constructor(repository) {
        this.#repository = repository;
    }

    /**
     * Get all enabled contacts
     * @param {*} rawQuery
     */
    async getAll(rawQuery) {
        const query = (typeof rawQuery !== 'object')
            ? { ...rawQuery, enabled: true }
            : { enabled: true }

        return await this.#repository.getAll(query);
    }

    /**
     * Get one contact
     * @param {string} id
     */
    async getOne(id) {
        const response = await this.#repository.getById(id);
        const contact = response.done ? response.result : {};

        if (contact.address && contact.address.city) {
            const apiClient = new WeatherApiClient();
            contact.address.weatherData = await apiClient.getWeatherDataByCity(
                contact.address && contact.address.city
            );
        }

        return response;
    }
}

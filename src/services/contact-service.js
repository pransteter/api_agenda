import { WeatherApiClient } from './weather-api-client';
import { ContactRepository } from '../repositories/contact-repository';
import buildContactFilterQuery from './helpers/build-contact-filter-query';

export class ContactService {
    /**
     * @property {ContactRepository}
     */
    repository;

    /**
     * Constructor method
     * @param {ContactRepository} repository
     */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Get all enabled contacts
     * @param {*} rawQuery
     */
    async getAll(rawQuery) {
        const filterQuery = (typeof rawQuery === 'object')
            ? buildContactFilterQuery(rawQuery)
            : {};

        return this.repository.getAll({ ...filterQuery, enabled: true });
    }

    /**
     * Get one contact
     * @param {string} id
     */
    async getOne(id) {
        const response = await this.repository.getOne(id);
        const contact = response.done ? response.result : {};

        if (contact.address && contact.address.city) {
            const apiClient = new WeatherApiClient();
            contact.address.weatherData = await apiClient.getWeatherDataByCity(
                contact.address && contact.address.city
            );
        }

        return response;
    }

    /**
     * Remove one contact
     * @param {String} id
     */
    async removeOne(id) {
        return this.repository.updateOne(id, { enabled: false });
    }
}

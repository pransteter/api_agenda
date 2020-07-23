import { ContactService } from '../services/contact-service';
import { ContactRepository } from '../repositories/contact-repository';
import { Request, Response } from 'express';

export class ContactController {
    /**
     * @property {ContactRepository}
     */
    repository;

    /**
     * @property {ContactService}
     */
    service;

    /**
     * Contructor method
     */
    constructor() {
        this.repository = new ContactRepository;
        this.service = new ContactService(this.repository);
    }

    /**
     * Get all contacts
     * @param {Request} req
     * @param {Response} res
     */
    async getAll(req, res) {
        const serviceResponse = await this.service.getAll(req.query);

        if (serviceResponse.done === false) {
            return res.status(500).send(serviceResponse.errorMsg);
        }

        return res.status(200).send(serviceResponse.result);
    }

    /**
     * Create one contact
     * @param {Request} req
     * @param {Response} res
     */
    async createOne(req, res) {
        const newContact = req.body || null;

        const serviceResponse = await this.repository.createOne(newContact);

        if (serviceResponse.done === false) {
            return res.status(400).send(serviceResponse.errorMsg);
        }

        return res.status(201).send();
    }

    /**
     * Get one contact
     * @param {Request} req
     * @param {Response} res
     */
    async getOne(req, res) {
        const contactId = req.params.id || null;

        if (contactId === null) {
            return res.status(400).send('You need to send a ID as a url parameter.');
        }

        const serviceResponse = await this.service.getOne(contactId);

        if (serviceResponse.done === false) {
            return res.status(404).send(serviceResponse.errorMsg);
        }

        return res.status(200).send(serviceResponse.result);
    }

    /**
     * Update one contact
     * @param {Request} req
     * @param {Response} res
     */
    async updateOne(req, res) {
        const contactId = req.params.id || null;
        const newContactData = req.body || null;

        if (contactId === null) {
            return res.status(400).send('You need to send a ID as a url parameter.');
        }

        const serviceResponse = await this.repository.updateOne(contactId, newContactData);

        if (serviceResponse.done === false) {
            return res.status(404).send(serviceResponse.errorMsg);
        }

        return res.status(204).send();
    }

    /**
     * Remove one contact
     * @param {Request} req
     * @param {Response} res
     */
    async removeOne(req, res) {
        const contactId = req.params.id || null;

        if (contactId === null) {
            return res.status(400).send('You need to send a ID as a url parameter.');
        }

        const serviceResponse = await this.service.removeOne(contactId);

        if (serviceResponse.done === false) {
            return res.status(404).send(serviceResponse.errorMsg);
        }

        return res.status(204).send();
    }
}

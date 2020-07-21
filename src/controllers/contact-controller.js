import { ContactService } from '../services/contact-service';
import { ContactRepository } from '../repositories/contact-repository';
import { RepositoryResponse } from '../repositories/structures/repository-response';
import { EntityManager } from '../core/database/entity-manager';

export const contactController = {
    async getAll(req, res) {
        const service = new ContactService(new ContactRepository(new EntityManager));
        const result = await service.getAll(req.query);

        if (result.done === false) {
            return res.status(500).send(result.errorMsg);
        }

        return res.status(200).send(result.contacts);
    },

    async createOne(req, res) {
        const newContact = req.body || null;

        const result = await contactService.createOne(newContact);

        if (result.done === false) {
            return res.status(400).send(result.errorMsg);
        }

        return res.status(204).send();
    },

    async getOne(req, res) {
        const contactId = req.params.id || null;

        if (contactId === null) {
            return res.status(400).send('You need to send a ID as a url parameter.');
        }

        const result = await contactService.getOne(contactId);

        if (result.done === false) {
            return res.status(404).send(result.errorMsg);
        }

        return res.status(200).send(result.contact);
    },

    async updateOne(req, res) {
        const contactId = req.params.id || null;
        const newContactData = req.body || null;

        if (contactId === null) {
            return res.status(400).send('You need to send a ID as a url parameter.');
        }

        const result = await contactService.updateOne(contactId, newContactData);

        if (result.done === false) {
            return res.status(404).send(result.errorMsg);
        }

        return res.status(204).send();
    },

    async removeOne(req, res) {
        const contactId = req.params.id || null;

        if (contactId === null) {
            return res.status(400).send('You need to send a ID as a url parameter.');
        }

        const result = await contactService.removeOne(contactId);

        if (result.done === false) {
            return res.status(404).send(result.errorMsg);
        }

        return res.status(204).send();
    }
}

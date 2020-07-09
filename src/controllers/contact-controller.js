const contactService = require("../services/contact-service");

module.exports = {
    async getAll(req, res) {
        let response, code;

        try {
            response = await contactService.getAll();
            code = 200;
        } catch (err) {
            response = err.message;
            code = 404;
        }

        return res.status(code).send(response);
    },
    async createOne(req, res) {
        let response, code;

        const newContact = req.body || null;

        try {
            response = await contactService.createOne(newContact);
            code = 204;
        } catch (err) {
            response = err.message;
            code = 404;
        }

        return res.status(code).send(response);
    },
    async getOne(req, res) {
        let response, code;

        const contactId = req.params.id || null;

        try {
            response = await contactService.getOne(contactId);
            code = 200;
        } catch (err) {
            response = err.message;
            code = 404;
        }

        return res.status(code).send(response);
    },
    async updateOne(req, res) {
        let response, code;

        const contactId = req.params.id || null;
        const newContactData = req.body || null;

        try {
            response = await contactService.updateOne(contactId, newContactData);
            code = 204;
        } catch (err) {
            response = err.message;
            code = 400;
        }

        return res.status(code).send(response);
    },
    async removeOne(req, res) {
        let response, code;

        const contactId = req.params.id || null;

        try {
            response = await contactService.removeOne(contactId);
            code = 200;
        } catch (err) {
            response = err.message;
            code = 404;
        }

        return res.status(code).send(response);
    }
}

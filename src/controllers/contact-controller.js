const contactService = require("../services/contact-service");

module.exports = {
    getAll(req, res) {
        return res.send('GET-ALL \n');
    },
    createOne(req, res) {
        return res.send('CREATE-ONE \n');
    },
    getOne(req, res) {
        let response, code;

        const contactId = req.params.id || null;

        try {
            response = contactService.getOne(contactId);
            code = 200;
        } catch (err) {
            response = err.message;
            code = 404;
        }

        return res.status(code).send(response);
    },
    updateOne(req, res) {
        return res.send('UPDATE-ONE \n');
    },
    removeOne(req, res) {
        return res.send('REMOVE-ONE \n');
    }
}

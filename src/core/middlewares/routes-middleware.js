const contactRoute = require('../../routes/contact-route');

const getRouter = require('express').Router;

module.exports = () => {
    const router = getRouter();
    contactRoute(router);
    return router;
};

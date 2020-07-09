const getRouter = require('express').Router;

const contactRoute = require('../../routes/contact-route');
const mainRoute = require('../../routes/main-route');

module.exports = () => {
    const router = getRouter();

    mainRoute(router);
    contactRoute(router);

    return router;
};

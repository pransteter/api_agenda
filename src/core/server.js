const routesMiddleware = require('./middlewares/routes-middleware');
const mongoConnnection = require('./database/mongo-connnection');
const Express = require('express');

module.exports = {
    async run(app) {
        await mongoConnnection();

        app.use(Express.json());
        app.use(routesMiddleware());

        app.listen(
            4001,
            console.log(`Api disponível no endereço: http://localhost:4001`)
        );
    }
};

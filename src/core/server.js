const routesMiddleware = require('./core/middlewares/routes-middleware');

module.exports = {
    run(app) {
        app.use(routesMiddleware());

        app.listen(
            4001,
            console.log(`Api disponível no endereço: http://localhost:4001`)
        );
    }
};

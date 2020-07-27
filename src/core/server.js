import routesMiddleware from './middlewares/routes-middleware';
import mongoConnnection from './database/mongo-connnection';
import Express from 'express';

export const server = {
  async run(app) {
    await mongoConnnection();

    app.use(Express.json());
    app.use(routesMiddleware());

    app.listen(
        4001,
        console.log(`Api disponível no endereço: http://localhost:4001`),
    );
  },
};

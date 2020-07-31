import {RoutesMiddleware} from './middlewares/routes-middleware';
import {MongoConnection} from './database/mongo-connection';
import Express from 'express';
import {config} from 'dotenv';

/**
 * Server class
 */
export class Server {
  /**
   * @property {Express}
   */
  app;

  /**
   * @property {MongoConnection}
   */
  mongoConnection;

  /**
   * @property {Router}
   */
  router;

  /**
   * Constructor method
   * @param {Express} app
   */
  constructor(app) {
    this.app = app;

    config();

    this.mongoConnection = new MongoConnection();

    const routesMiddleware = new RoutesMiddleware();
    routesMiddleware.attachRoutes();

    this.router = routesMiddleware.getRouter();
  }

  /**
   * Turn on the app to listen api requests
   */
  async up() {
    await this.mongoConnection.connect();

    this.app.use(Express.json());
    this.app.use(this.router);

    this.app.listen(
        4001,
        console.log(`Api disponível no endereço: http://localhost:4001`),
    );
  }
}

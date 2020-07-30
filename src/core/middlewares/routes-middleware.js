import {Router as getRouter} from 'express';

import {ContactRoute} from '../../routes/contact-route';
import {MainRoute} from '../../routes/main-route';

/**
 * RoutesMiddleware class
 */
export class RoutesMiddleware {
  /**
   * @property {Router}
   */
  router;

  /**
   * Constructor method
   */
  constructor() {
    this.router = getRouter();
  }

  /**
   * Attach all api routes.
   */
  attachRoutes() {
    new MainRoute(this.router).attach();
    new ContactRoute(this.router).attach();
  }

  /**
   * Get router to be used like a express middleware.
   * @return {Router}
   */
  getRouter() {
    return this.router;
  }
}

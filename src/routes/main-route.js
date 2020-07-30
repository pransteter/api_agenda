import {MainController} from '../controllers/main-controller';
import {Route} from './route';

/**
 * MainRoute class
 */
export class MainRoute extends Route {
  /**
   * Attach all main routes in express router
   */
  attach() {
    this.router.get('/health', (req, res) => {
      (new MainController).healthCheck(req, res);
    });
  }
}

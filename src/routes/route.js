/**
 * Route "abstract" class
 */
export class Route {
  /**
   * @property {Router}
   */
  router;

  /**
   * Constructor method
   * @param {Router} router
   */
  constructor(router) {
    this.router = router;
  }
}

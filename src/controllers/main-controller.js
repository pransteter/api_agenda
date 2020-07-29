/**
 * MainController class
 */
export class MainController {
  /**
   * Check if the service is responding
   * @param {Request} req
   * @param {Response} res
   */
  healthCheck(req, res) {
    res.status(200).send('It\'s working! \n');
  }
}

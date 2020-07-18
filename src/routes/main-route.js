import { mainController } from '../controllers/main-controller';

export default (router) => {
    router.get('/health', mainController.healthCheck);
}

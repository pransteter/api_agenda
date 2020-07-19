import mainRoute from '../../../../src/routes/main-route';
import { mainController } from '../../../../src/controllers/main-controller';

jest.mock('../../../../src/controllers/main-controller');

describe('Main route:', () => {
    let router;

    beforeEach(() => {
        router = {
            get: jest.fn()
        }
        mainController.healthCheck = jest.fn();
    });

    it('Should be success - create healthCheck route.', () => {
        mainRoute(router);
        expect(router.get).toHaveBeenCalledTimes(1);
        expect(router.get).toHaveBeenCalledWith('/health', mainController.healthCheck);
    });
});

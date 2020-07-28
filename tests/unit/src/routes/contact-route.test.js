import contactRoute from '../../../../src/routes/contact-route';
import {
  contactController,
} from '../../../../src/controllers/contact-controller';

jest.mock('../../../../src/controllers/contact-controller');

describe('Contact route:', () => {
  let router;

  beforeEach(() => {
    router = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };
    contactController.getAll = jest.fn();
    contactController.createOne = jest.fn();
    contactController.getOne = jest.fn();
    contactController.updateOne = jest.fn();
    contactController.removeOne = jest.fn();
  });

  it('Should be success - create contact routes.', () => {
    contactRoute(router);
    expect(router.get).toHaveBeenNthCalledWith(
        1, '/contacts', contactController.getAll,
    );
    expect(router.get).toHaveBeenNthCalledWith(
        2, '/contacts/:id', contactController.getOne,
    );
    expect(router.post).toHaveBeenNthCalledWith(
        1, '/contacts', contactController.createOne,
    );
    expect(router.put).toHaveBeenNthCalledWith(
        1, '/contacts/:id', contactController.updateOne,
    );
    expect(router.delete).toHaveBeenNthCalledWith(
        1, '/contacts/:id', contactController.removeOne,
    );
  });
});

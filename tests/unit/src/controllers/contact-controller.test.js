import {
  contactController,
} from '../../../../src/controllers/contact-controller';
import {contactService} from '../../../../src/services/contact-service';

jest.mock('../../../../src/services/contact-service');

describe('Contact controller:', () => {
  let reqMock;
  let resMock;
  let contactMock;
  let responseMock;

  beforeEach(() => {
    reqMock = {params: {}, body: {}, query: {}};
    resMock = {
      send: jest.fn(),
      status: jest.fn((code) => (resMock)),
    };
    contactMock = {name: 'Mock Guy'};
    responseMock = {done: true, errorMsg: ''};
    contactService.getOne = jest.fn((id) => (responseMock));
    contactService.createOne = jest.fn((contact) => (responseMock));
    contactService.updateOne = jest.fn((id, contact) => (responseMock));
    contactService.removeOne = jest.fn((id) => (responseMock));
    contactService.getAll = jest.fn((query) => (responseMock));
  });

  it('Should be success - controller.getOne().', async () => {
    reqMock.params.id = '123';
    responseMock.contact = contactMock;
    await contactController.getOne(reqMock, resMock);
    expect(contactService.getOne).toHaveBeenCalledTimes(1);
    expect(contactService.getOne).toHaveBeenCalledWith(reqMock.params.id);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith(contactMock);
  });

  it('Should be failed (service fail) - controller.getOne().', async () => {
    reqMock.params.id = '123';
    responseMock.done = false;
    responseMock.errorMsg = 'any message';
    await contactController.getOne(reqMock, resMock);
    expect(contactService.getOne).toHaveBeenCalledTimes(1);
    expect(contactService.getOne).toHaveBeenCalledWith(reqMock.params.id);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(404);
    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith(responseMock.errorMsg);
  });

  it('Should be failed (bad request) - controller.getOne().', async () => {
    delete reqMock.params.id;
    await contactController.getOne(reqMock, resMock);
    expect(contactService.getOne).toHaveBeenCalledTimes(0);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith(
        'You need to send a ID as a url parameter.',
    );
  });

  it('Should be success - controller.createOne().', async () => {
    reqMock.body = contactMock;
    await contactController.createOne(reqMock, resMock);
    expect(contactService.createOne).toHaveBeenCalledTimes(1);
    expect(contactService.createOne).toHaveBeenCalledWith(reqMock.body);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(204);
    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith();
  });

  it('Should be failed - controller.createOne().', async () => {
    delete reqMock.body;
    responseMock.done = false;
    responseMock.errorMsg = 'any message';
    await contactController.createOne(reqMock, resMock);
    expect(contactService.createOne).toHaveBeenCalledTimes(1);
    expect(contactService.createOne).toHaveBeenCalledWith(null);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith(responseMock.errorMsg);
  });

  it('Should be success - controller.updateOne().', async () => {
    reqMock.params.id = '123';
    reqMock.body = contactMock;
    await contactController.updateOne(reqMock, resMock);
    expect(contactService.updateOne).toHaveBeenCalledTimes(1);
    expect(contactService.updateOne).toHaveBeenCalledWith(
        reqMock.params.id, reqMock.body,
    );
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(204);
    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith();
  });

  it('Should be failed (service fail) - controller.updateOne().', async () => {
    reqMock.params.id = '123';
    delete reqMock.body;
    responseMock.done = false;
    responseMock.errorMsg = 'Any error';
    await contactController.updateOne(reqMock, resMock);
    expect(contactService.updateOne).toHaveBeenCalledTimes(1);
    expect(contactService.updateOne).toHaveBeenCalledWith(
        reqMock.params.id, null,
    );
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(404);
    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith(responseMock.errorMsg);
  });

  it('Should be failed (bad request) - controller.updateOne().', async () => {
    delete reqMock.params.id;
    reqMock.body = contactMock;
    await contactController.updateOne(reqMock, resMock);
    expect(contactService.updateOne).toHaveBeenCalledTimes(0);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith(
        'You need to send a ID as a url parameter.',
    );
  });

  it('Should be success - controller.removeOne().', async () => {
    reqMock.params.id = '123';
    await contactController.removeOne(reqMock, resMock);
    expect(contactService.removeOne).toHaveBeenCalledTimes(1);
    expect(contactService.removeOne).toHaveBeenCalledWith(reqMock.params.id);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(204);
    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith();
  });

  it('Should be failed (service fail) - controller.removeOne().', async () => {
    reqMock.params.id = '123';
    responseMock.done = false;
    responseMock.errorMsg = 'Any error';
    await contactController.removeOne(reqMock, resMock);
    expect(contactService.removeOne).toHaveBeenCalledTimes(1);
    expect(contactService.removeOne).toHaveBeenCalledWith(reqMock.params.id);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(404);
    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith(responseMock.errorMsg);
  });

  it('Should be failed (bad request) - controller.removeOne().', async () => {
    delete reqMock.params.id;
    await contactController.removeOne(reqMock, resMock);
    expect(contactService.removeOne).toHaveBeenCalledTimes(0);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith(
        'You need to send a ID as a url parameter.',
    );
  });

  it('Should be success - controller.getAll().', async () => {
    reqMock.query = {name: 'mock name'};
    responseMock.contacts = [contactMock];
    await contactController.getAll(reqMock, resMock);
    expect(contactService.getAll).toHaveBeenCalledTimes(1);
    expect(contactService.getAll).toHaveBeenCalledWith(reqMock.query);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith(responseMock.contacts);
  });

  it('Should be failed (service fail) - controller.getAll().', async () => {
    reqMock.query = {name: 'mock name'};
    responseMock.done = false;
    responseMock.errorMsg = 'Any error';
    await contactController.getAll(reqMock, resMock);
    expect(contactService.getAll).toHaveBeenCalledTimes(1);
    expect(contactService.getAll).toHaveBeenCalledWith(reqMock.query);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith(responseMock.errorMsg);
  });
});

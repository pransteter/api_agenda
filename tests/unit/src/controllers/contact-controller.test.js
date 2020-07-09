const contactController = require("../../../../src/controllers/contact-controller");
const contactService = require("../../../../src/services/contact-service");

jest.mock('../../../../src/services/contact-service');

describe('Contact controller:', () => {
    let reqMock;
    let resMock;
    let contactMock;

    beforeEach(() => {
        reqMock = { params: {}, body: {} };
        resMock = {
            send: jest.fn(),
            status: jest.fn((code) => (resMock))
        };
        contactMock = { name: 'Mock Guy' };
        contactService.getOne = jest.fn((id) => (contactMock));
        contactService.createOne = jest.fn((contact) => (true));
        contactService.updateOne = jest.fn((id, contact) => (true));
        contactService.removeOne = jest.fn((id) => (true));
        contactService.getAll = jest.fn(() => ([contactMock]));
    });

    it('Should be success - controller.getOne().', () => {
        reqMock.params.id = '123';
        contactController.getOne(reqMock, resMock);
        expect(contactService.getOne).toHaveBeenCalledTimes(1);
        expect(contactService.getOne).toHaveBeenCalledWith(reqMock.params.id);
        expect(resMock.status).toHaveBeenCalledTimes(1);
        expect(resMock.status).toHaveBeenCalledWith(200);
        expect(resMock.send).toHaveBeenCalledTimes(1);
        expect(resMock.send).toHaveBeenCalledWith(contactMock);
    });

    it('Should be failed - controller.getOne().', () => {
        delete reqMock.params.id;
        contactService.getOne = jest.fn((id) => {
            throw Error(`There is no contact with Id ${id}`);
        });
        contactController.getOne(reqMock, resMock);
        expect(contactService.getOne).toHaveBeenCalledTimes(1);
        expect(contactService.getOne).toHaveBeenCalledWith(null);
        expect(resMock.status).toHaveBeenCalledTimes(1);
        expect(resMock.status).toHaveBeenCalledWith(404);
        expect(resMock.send).toHaveBeenCalledTimes(1);
        expect(resMock.send).toHaveBeenCalledWith(`There is no contact with Id ${null}`);
    });

    it('Should be success - controller.createOne().', () => {
        reqMock.body = contactMock;
        contactController.createOne(reqMock, resMock);
        expect(contactService.createOne).toHaveBeenCalledTimes(1);
        expect(contactService.createOne).toHaveBeenCalledWith(reqMock.body);
        expect(resMock.status).toHaveBeenCalledTimes(1);
        expect(resMock.status).toHaveBeenCalledWith(204);
        expect(resMock.send).toHaveBeenCalledTimes(0);
    });

    it('Should be failed - controller.createOne().', () => {
        reqMock.body = '123wrong';
        contactService.createOne = jest.fn((id) => {
            throw Error('Parameter needs to be an object.');
        });
        contactController.createOne(reqMock, resMock);
        expect(contactService.createOne).toHaveBeenCalledTimes(1);
        expect(contactService.createOne).toHaveBeenCalledWith(reqMock.body);
        expect(resMock.status).toHaveBeenCalledTimes(1);
        expect(resMock.status).toHaveBeenCalledWith(400);
        expect(resMock.send).toHaveBeenCalledTimes(1);
        expect(resMock.send).toHaveBeenCalledWith('Parameter needs to be an object.');
    });

    it('Should be success - controller.updateOne().', () => {
        reqMock.params.id = '123';
        reqMock.body = contactMock;
        contactController.updateOne(reqMock, resMock);
        expect(contactService.updateOne).toHaveBeenCalledTimes(1);
        expect(contactService.updateOne).toHaveBeenCalledWith(reqMock.params.id, reqMock.body);
        expect(resMock.status).toHaveBeenCalledTimes(1);
        expect(resMock.status).toHaveBeenCalledWith(204);
        expect(resMock.send).toHaveBeenCalledTimes(0);
    });

    it('Should be failed - controller.updateOne().', () => {
        reqMock.params.id = '123';
        reqMock.body = '123wrong';
        contactService.updateOne = jest.fn((id, contact) => {
            throw Error('Parameter needs to be an object.');
        });
        contactController.updateOne(reqMock, resMock);
        expect(contactService.updateOne).toHaveBeenCalledTimes(1);
        expect(contactService.updateOne).toHaveBeenCalledWith(reqMock.params.id, reqMock.body);
        expect(resMock.status).toHaveBeenCalledTimes(1);
        expect(resMock.status).toHaveBeenCalledWith(400);
        expect(resMock.send).toHaveBeenCalledTimes(1);
        expect(resMock.send).toHaveBeenCalledWith('Parameter needs to be an object.');
    });

    it('Should be success - controller.removeOne().', () => {
        reqMock.params.id = '123';
        contactController.removeOne(reqMock, resMock);
        expect(contactService.removeOne).toHaveBeenCalledTimes(1);
        expect(contactService.removeOne).toHaveBeenCalledWith(reqMock.params.id);
        expect(resMock.status).toHaveBeenCalledTimes(1);
        expect(resMock.status).toHaveBeenCalledWith(204);
        expect(resMock.send).toHaveBeenCalledTimes(0);
    });

    it('Should be failed - controller.removeOne().', () => {
        reqMock.params.id = '123';
        contactService.removeOne = jest.fn((id) => {
            throw Error(`There is no contact with Id ${id}`);
        });
        contactController.removeOne(reqMock, resMock);
        expect(contactService.removeOne).toHaveBeenCalledTimes(1);
        expect(contactService.removeOne).toHaveBeenCalledWith(reqMock.params.id);
        expect(resMock.status).toHaveBeenCalledWith(404);
        expect(resMock.send).toHaveBeenCalledTimes(1);
        expect(resMock.send).toHaveBeenCalledWith('There is no contact with Id 123');
    });

    it('Should be success - controller.getAll().', () => {
        contactController.getAll(reqMock, resMock);
        expect(contactService.getAll).toHaveBeenCalledTimes(1);
        expect(contactService.getAll).toHaveBeenCalledWith();
        expect(resMock.send).toHaveBeenCalledTimes(1);
        expect(resMock.send).toHaveBeenCalledWith([contactMock]);
    });

    it('Should be failed - controller.getAll().', () => {
        contactService.getAll = jest.fn(() => {
            throw Error('No database connection.');
        });
        contactController.getAll(reqMock, resMock);
        expect(contactService.getAll).toHaveBeenCalledTimes(1);
        expect(contactService.getAll).toHaveBeenCalledWith();
        expect(resMock.status).toHaveBeenCalledTimes(1);
        expect(resMock.status).toHaveBeenCalledWith(500);
        expect(resMock.send).toHaveBeenCalledTimes(1);
        expect(resMock.send).toHaveBeenCalledWith('No database connection.');
    });
});
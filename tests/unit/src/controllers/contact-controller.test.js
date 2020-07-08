const contactController = require("../../../../src/controllers/contact-controller");
const contactService = require("../../../../src/services/contact-service");

jest.mock('../../../../src/services/contact-service');

describe('Contact controller:', () => {
    let reqMock;
    let resMock;

    beforeEach(() => {
        reqMock = { params: { id: '123' } };
        resMock = {
            send: jest.fn(),
            status: jest.fn((code) => (resMock))
        };
        contactService.getOne = jest.fn((id) => ({ name: 'Mock Guy' }));
    });

    it('Should fill response with contact.', () => {
        contactController.getOne(reqMock, resMock);
        expect(contactService.getOne).toHaveBeenCalledTimes(1);
        expect(contactService.getOne).toHaveBeenCalledWith('123');
        expect(resMock.send).toHaveBeenCalledTimes(1);
        expect(resMock.send).toHaveBeenCalledWith({ name: 'Mock Guy' });
    });

    it('Should fill response with error message.', () => {
        contactService.getOne = jest.fn((id) => {
            throw Error(`There is no contact with Id ${id}`);
        });
        contactController.getOne(reqMock, resMock);
        expect(contactService.getOne).toHaveBeenCalledTimes(1);
        expect(contactService.getOne).toHaveBeenCalledWith('123');
        expect(resMock.status).toHaveBeenCalledWith(404);
        expect(resMock.send).toHaveBeenCalledTimes(1);
        expect(resMock.send).toHaveBeenCalledWith('There is no contact with Id 123');
    });
});
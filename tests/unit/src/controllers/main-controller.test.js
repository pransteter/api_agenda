const mainController = require("../../../../src/controllers/main-controller");

describe('Main controller:', () => {
    let reqMock;
    let resMock;

    beforeEach(() => {
        reqMock = {};
        resMock = {
            send: jest.fn(),
            status: jest.fn((code) => (resMock))
        };
    });

    it('Should be success - controller.healthCheck().', () => {
        mainController.healthCheck(reqMock, resMock);
        expect(resMock.status).toHaveBeenCalledTimes(1);
        expect(resMock.status).toHaveBeenCalledWith(200);
        expect(resMock.send).toHaveBeenCalledTimes(1);
        expect(resMock.send).toHaveBeenCalledWith('It\'s working! \n');
    });
});

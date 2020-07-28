import contactEntity from '../../../../src/entities/contact';

describe('Contact entity:', () => {
  let mongooseMock;

  beforeEach(() => {
    mongooseMock = {
      Schema: jest.fn().mockImplementation((rawSchema) => {
        'mock';
      }),
    };
  });

  it('Should be success - create schema calling mongoose method.', () => {
    contactEntity(mongooseMock);
    expect(mongooseMock.Schema).toHaveBeenCalledTimes(1);
    expect(mongooseMock.Schema).toHaveBeenCalledWith({
      name: String,
      email: String,
      phones: [String],
      address: {
        street: String,
        localNumber: String,
        postalCode: String,
        city: String,
        state: String,
        country: String,
      },
      enabled: {type: Boolean, default: true},
    });
  });
});

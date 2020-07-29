import mongoose from 'mongoose';

/**
 * MongoConnection class
 */
export class MongoConnection {
  /**
   * @property {String}
   */
  mongoAddress;

  /**
   * Constructor method
   */
  constructor() {
    this.mongoAddress = `mongodb://${
      process.env.MONGO_USER || ''
    }:${
      process.env.MONGO_PASSWORD || ''
    }@${
      process.env.MONGO_IP || ''
    }:${
      process.env.MONGO_PORT || ''
    }/${
      process.env.MONGO_DB_NAME || ''
    }`;
  }

  /**
   * Create one connection with mongo database
   */
  async connect() {
    mongoose.set('useUnifiedTopology', true);

    await mongoose.connect(
        this.mongoAddress,
        {useNewUrlParser: true, useFindAndModify: false},
    );

    mongoose.connection.on(
        'error',
        console.error.bind(console, 'connection error:'),
    );
  }
}

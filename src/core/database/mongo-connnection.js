const mongoose = require('mongoose');

module.exports = async() => {
    const url = `mongodb://${
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

    await mongoose.connect(
        url,
        { useNewUrlParser: true }
    );

    mongoose.connection.on(
        'error',
        console.error.bind(console, 'connection error:')
    );
}

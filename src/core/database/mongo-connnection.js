const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);

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

module.exports = async() => {
    await mongoose.connect(
        url,
        { useNewUrlParser: true, useFindAndModify: false }
    );

    mongoose.connection.on(
        'error',
        console.error.bind(console, 'connection error:')
    );
}

export default (mongoose) => {
    const schema = new mongoose.Schema({
        name: String,
        email: String,
        phones: [String],
        address: {
            street: String,
            localNumber: String,
            postalCode: String,
            city: String,
            state: String,
            country: String
        },
        enabled: { type: Boolean, default: true }
    });

    return schema;
};

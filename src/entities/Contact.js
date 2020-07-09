module.exports = {
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
    enabled: Boolean
}

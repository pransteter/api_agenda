const EntityManager = require("../core/database/entity-manager");

module.exports = {
    async getAll() {
        const em = new EntityManager();
        console.log(em);
        // fetch all
        return [{ name: 'Romulo Mockman' }];
    },
    async createOne(data) {
        // save
        return true;
    },
    async getOne(id) {
        // get by id
        return { name: 'Romulo Mockman' };
    },
    async updateOne(id, data) {
        // update
        return true;
    },
    async removeOne(id) {
        // remove
        return true;
    }
};
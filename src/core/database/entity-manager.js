const mongoose = require('mongoose');

class EntityManager {
    constructor() {
        this.schema = schema;
        this.entity = null;
    }

    async loadEntity(name) {
        this.entity = mongoose.model(name, new mongoose.Schema(
            require(`../../entities/${name}`)
        ));
    }

    async getById(id) {
        return this.entity.findById(id);
    }

    async find(query) {
        const filterValues = { ...query, enabled: true };
        return this.entity.find(filterValues);
    }

    async updateById(id, newEntityValues) {
        return this.entity.findByIdAndUpdate(id, newEntityValues);
    }

    async removeById(id) {
        return this.updateById(id, { enabled: false });
    }
}

module.exports = EntityManager;

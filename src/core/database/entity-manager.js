import mongoose from 'mongoose';

export class EntityManager {
    constructor() {
        this.schema = '';
        this.entity = null;
    }

    async loadEntity(name, schema) {
        try {
            this.entity = mongoose.model(name);
        } catch (err) {
            this.entity = mongoose.model(name, schema(mongoose));
        }
    }

    async create(data) {
        return this.entity.create(data);
    }

    async getById(id) {
        return this.entity.findById(id);
    }

    async find(query) {
        const filterValues = { ...query, enabled: true };
        return this.entity.find(filterValues);
    }

    async updateById(id, newEntityValues) {
        return this.entity.findByIdAndUpdate(id, { ...newEntityValues, _id: id });
    }

    async removeById(id) {
        return this.updateById(id, { enabled: false });
    }
}

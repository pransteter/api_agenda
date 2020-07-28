import mongoose from 'mongoose';

/**
 * EntityManager Class.
 */
export class EntityManager {
  /**
   * Constructor method.
   */
  constructor() {
    this.schema = '';
    this.entity = null;
  }

  /**
   * LoadEntity method to load an mongoose model/schema.
   * @param {String} name
   * @param {Function} schemaFunc
   */
  async loadEntity(name, schemaFunc) {
    try {
      this.entity = mongoose.model(name);
    } catch (err) {
      this.entity = mongoose.model(name, schemaFunc(mongoose));
    }
  }

  /**
   * Create method to persist one entity on database.
   * @param {Object} data
   */
  async create(data) {
    return this.entity.create(data);
  }

  /**
   * Get one persisted entity by id from database.
   * @param {String} id
   */
  async getById(id) {
    return this.entity.findById(id);
  }

  /**
   * Find all entities that match with attributes specified on query object.
   * @param {Object} query
   */
  async find(query) {
    const filterValues = {...query, enabled: true};
    return this.entity.find(filterValues);
  }

  /**
   * Update one entity with new data and persist it.
   * @param {String} id
   * @param {Object} newEntityValues
   */
  async updateById(id, newEntityValues) {
    return this.entity.findByIdAndUpdate(id, {...newEntityValues, _id: id});
  }

  /**
   * Remove permanently one entity indentified by id.
   * @param {String} id
   */
  async removeById(id) {
    return this.entity.remove({_id: id});
  }
}

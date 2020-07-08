module.exports = {
    getAll() {
        // fetch all
        return [{ name: 'Romulo Mockman' }];
    },
    createOne(data) {
        // save
        return true;
    },
    getOne(id) {
        // get by id
        return { name: 'Romulo Mockman' };
    },
    updateOne(id, data) {
        // update
        return true;
    },
    removeOne(id) {
        // remove
        return true;
    }
};
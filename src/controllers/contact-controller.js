module.exports = {
    getAll(req, res) {
        return res.send('GET-ALL \n');
    },
    createOne(req, res) {
        return res.send('CREATE-ONE \n');
    },
    getOne(req, res) {
        return res.send('GET-ONE \n');
    },
    updateOne(req, res) {
        return res.send('UPDATE-ONE \n');
    },
    removeOne(req, res) {
        return res.send('REMOVE-ONE \n');
    }
}

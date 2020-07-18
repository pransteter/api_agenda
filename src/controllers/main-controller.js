export const mainController = {
    healthCheck(req, res) {
        return res.status(200).send('It\'s working! \n');
    }
};

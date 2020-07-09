const mainController = require("../controllers/main-controller");

module.exports = (router) => {
    router.get('/health', mainController.healthCheck);
}

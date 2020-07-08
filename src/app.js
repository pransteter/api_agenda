const express = require('express');
const routesMiddleware = require('./core/middlewares/routes-middleware');

const app = express();

app.use(routesMiddleware());

app.get('/health', (req, res) => res.send('It\'s working! \n'));

app.listen(
    4001,
    console.log(`Api disponível no endereço: http://localhost:4001`)
);
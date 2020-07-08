const express = require('express');
const server = require('./src/core/server');

const app = express();

server.run(app);

const express = require('express')

const app = express()

app.get('/health', (req, res) => res.send('It\'s working! \n'));

app.listen(
    4001,
    console.log(`Api disponível no endereço: http://localhost:4001`)
);
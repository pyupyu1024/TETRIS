const express = require('express');
const socket = require('./src/io');

const app = express();
const server = socket(app);
app.disable('x-powered-by');

app.use(express.static('html', {
    extensions: ['html', 'htm']
}));

app.use((_req, res) => res.redirect('/404'));
server.listen(5000, () => console.log('ON'));
const express = require('express');
const socket = require('./src/io');
const tetris_map = require('./src/tetris/tetris_map')

const app = express();
const server = socket(app);
app.disable('x-powered-by');

app.use(express.static('html', {
    extensions: ['html', 'htm', "js"]
}));

app.use((_req, res) => res.redirect('/main.html'));
server.listen(5000, () => console.log('ON'));

const testMap = new tetris_map(10,20);
testMap.setBlocks(1,0xf)
console.log(testMap.makeHashData());
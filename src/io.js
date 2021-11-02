const online = new Map();
const uuid = require('./uuid');

module.exports = function(app) {

    const server = require('http').createServer(app);
    const socket_io = require('socket.io')(server);

    socket_io.on('connection', (socket) => {

        socket.on('enter', (code) => {

            const room = online.get(code);

            if (code && room.length < 2) {

                room.concat(socket.id);
                online.set(code, room);

            } else {

                while (!online.has(code = uuid()));
                online.set(code, [ socket.id ]);
                
            }

            socket.emit('enter', code);
            this.code = code;
        });

        socket.on('move', ([x, y]) => {
            if (Math.abs(x) > 1 || y > 0) return;
            const room = online.get(this.code);
            io.to(room[0]).emit('move', [x, y]);
            io.to(room[1]).emit('move', [x, y]);
        });

        socket.on('disconnect', () => {

            const room = online.get(this.code);
            const i = room.indexOf(socket.id);

            if (i !== -1) room.splice(i, 1);

            online.set(this.code, room);
            io.to(room[0]).emit('quit');

            if (!room[0]) online.delete(this.code);

        });

    });

    return server;
};
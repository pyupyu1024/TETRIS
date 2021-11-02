const online = new Map();
const uuid = require('./uuid');

module.exports = function(app) {

    const server = require('http').createServer(app);
    const socket_io = require('socket.io')(server);

    socket_io.on('connection', socket => {

        socket.on('enter', code => {
            
            const room = online.get(code);

            if (code && room.length < 2) {

                room.concat(socket.id);
                online.set(code, room);

            } else {

                while (!online.has(code = uuid()));
                online.set(code, [ socket.id ]);

            }
        });

        socket.on('disconnect', () => {

            const room = online.get(code);
            const i = room.indexOf(socket.id);

            if (i !== -1) room.splice(i, 1);

            online.set(code, room);

            if (room.length === 0)
                online.delete(code);

        });

    });

    return server;

}
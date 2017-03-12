var socketio = require('socket.io');
var http = require('http');

var sockets = [];
var io;

function init(server) {
    io = socketio(server);
    io.on('connection', function (socket) {
        sockets.push(socket);
        socket.on('broadcast', function (data) {
            console.log(`message: ${data.message}`);
            submit('message', { message: data.message });
        });

        socket.on('search-giphy', function (data) {
            http.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=epic+fail',
                (res) => {
                    res.setEncoding('utf8');
                    let rawData = '';
                    res.on('data', (chunk) => rawData += chunk);
                    res.on('end', () => {
                        try {
                            let parsedData = JSON.parse(rawData);
                            console.log(parsedData);
                            submit('show-giphy', { url: parsedData.data.image_original_url });
                        } catch (e) {
                            console.log(e.message);
                        }
                    });
                })

        });

    });

}
function submit(action, data) {
    for (var i = 0; i < sockets.length; i++) {
        sockets[i].emit(action, data);
    }
}

module.exports = { init };

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(require('express').static(__dirname));
app.use(bodyParser.json());
app.use(cors())
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
        console.log('a user disconnected');
    });
});



http.listen(3000, function () {
    console.log('listenting on 3000');
});


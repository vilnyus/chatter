const express = require('express');
var path = require('path');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/socket.io', (req, res)=>{
//     res.sendFile(__dirname + '/public/socket.io.js');
// });

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('message', { manny: 'hey how are you?'});
    socket.on('another event', (data)=>{
        console.log(data);
    })
})

const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/javascript.html', (req, res)=>{
    res.sendFile(__dirname + '/public/javascript.html');
});

app.get('/typescript.html', (req, res)=>{
    res.sendFile(__dirname + '/public/typescript.html');
});

app.get('/css.html', (req, res)=>{
    res.sendFile(__dirname + '/public/css.html');
});

const tech = io.of('/tech');

tech.on('connection', (socket) => {
    socket.on('join', (data)=>{
        socket.join(data.room);
        tech.in(data.room).emit('message', `New user connected to room ${data.room}!`);
        console.log(`New user connected to room ${data.room}!`);
    })
    
    socket.on('message', (data)=> {
        tech.in(data.room).emit('message', data.msg);        
        console.log(`message: ${data.msg}`);
    });

    socket.on('disconnect', ()=>{
        console.log('user disconnected');        
        tech.emit('message', 'user disconnected');
    });
})

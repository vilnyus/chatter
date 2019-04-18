const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io').apply(server);


const socket = io.connect('http://127.0.0.1:3000');
socket.on('message', (data) => {
  console.log(data);
  socket.emit('another event', { jeremy: 'I am great thank you'});
})
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  socket.on('new comment', (data) => {
    io.emit('comment received', data); // Envía el comentario a todos los clientes conectados
  });

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

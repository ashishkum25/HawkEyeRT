const express = require('express');
const app = express();
const path = require('path');

//BoilerPlate code for socket.io
const http = require('http'); //http is required whenever we want to use socket.io
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", (socket) => {
  socket.on('send-location', (data) => {
    io.emit('receive-location', {id: socket.id, ...data});
  });
  socket.on('disconnect', () => {
    io.emit('user-disconnected', socket.id);
  })
});

app.get('/', (req, res) => {
  res.render('index.ejs');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
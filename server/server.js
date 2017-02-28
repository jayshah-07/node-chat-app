const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log("New user connected");

// email from server to client
  // socket.emit('newMessage', {
  //   form : "jay@example.com",
  //   text: "learing socket...",
  //   createdAt:123
  // });

  socket.emit('newMessage',{
    from: "Admin",
    text: "welcoome to Chat app",
    createdAt: new Date().getTime()
  });
  // socket.broadcast.emit from admin to the new user who joined
  socket.broadcast.emit("newMessage",{
    from: "Admin",
    text: "New user joined",
    createdAt: new Date().getTime()
  });


  //email from client to server
  socket.on('createMessage', (message)=>{
    console.log("created new Message: ", message);
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  });

  socket.on('disconnect', ()=>{
    console.log("User disconnected.");
  });
});

server.listen(port,() => {
  console.log(`Server is up on ${port}`);
})
// console.log(__dirname + '/../public');
// console.log(publicPath);

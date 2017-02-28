var socket = io();
socket.on('connect', ()=>{
  console.log("connected to the server.");

  // socket.emit('createMessage', {
  //   to: 'abc@example.com',
  //   text: "dummy text msz."
  // });
});
socket.on('disconnect', ()=>{
  console.log("Disconnected from the server.");
});

socket.on('newMessage', (message) =>{
  console.log("New Message", message);
})

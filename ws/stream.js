//this is the client side js that handles the chat
//this is the client side js that handles the chat

// How a chat is sent
// 271 of rtc.js, adds an event listener on enter button of chat text box
// -when clicked, calls method called sendMsg, which is in rtc 121
// -this method takes in a message. It uses this message to become part of a data object, which has the room#, message and sender

// - two paths go on from here, one for the user, one for other users on the socket

// FOR THE USER:

// -h.addChat is called from helper.js, line 129, for the user himself. this is sent as a parameter. this method actually appends the message 
// for the user.

// FOR OTHER USERS:
// - it then emits it through socket.emit, and calls the method 'chat', while sending the data object
// -the method 'chat' is in stream.js 33. it takes in the data object and emits it, only to data.room, sending data.msg and data.sender 
// to the 'chat' method in rtc.js 103
// - it takes in the data and calls a method from helper.js, h.addChat, at line 129; it takes in the message and the remote sender type (for other users)
// - it then appends it to be seen by other users

const stream = (socket) => {
  socket.on("subscribe", (data) => {
    //subscribe/join a room
    socket.join(data.room);
    socket.join(data.socketId);

    //Inform other members in the room of new user's arrival
    if (socket.adapter.rooms[data.room].length > 1) {
      socket.to(data.room).emit("new user", { socketId: "data.socketId" });
    }
  });

  socket.on("newUserStart", (data) => {
    socket.to(data.to).emit("newUserStart", { sender: data.sender }); //emits the data to everyone on the socket
  });

  socket.on("sdp", (data) => {
    socket
      .to(data.to)
      .emit("sdp", { description: data.description, sender: data.sender });
  });

  socket.on("ice candidates", (data) => {
    socket
      .to(data.to)
      .emit("ice candidates", {
        candidate: data.candidate,
        sender: data.sender,
      });
  });

  socket.on("chat", (data) => {
    //take in the data object
    socket.to(data.room).emit("chat", { sender: data.sender, msg: data.msg }); //sending it back to chat method in server js with sender and the message
  });
};

module.exports = stream;

const path = require("path");
const fs = require("fs");
const storage = path.join(__dirname, "Storage.json");

// updateData = () =>{
//     data = JSON.parse(fs.readFileSync(path.join(__dirname,'Storage.json'),'utf8', err =>{
//         if (err) throw err;
//     }));
// }
// saveData = () =>{
//     fs.writeFile(path.join(__dirname, 'Storage.json'),JSON.stringify(data), err =>{
//         if (err) throw err;
//     });
// }

const {
  SEND_CHAT_MESSAGE,
  GET_LIST_OF_CHATS_BY_MEMBER,
  GET_CHAT_MESSAGES_BY_CHAT,
} = require("../action.constants");

const sendMessage = (io, socket) => {
  socket.on(SEND_CHAT_MESSAGE, (roomID, message) => {
    // console.log(roomID, message);
    fs.readFile(storage, "utf8", (error, file) => {
      if (error) console.log(error);
      const data = JSON.parse(file);
      const index = data.chatRooms.findIndex((room) => {
        return room.id === roomID;
      });
      // console.log(index);
      data.chatRooms[index].messages.push(message);
      fs.writeFile(storage, JSON.stringify(data), "utf8", (error) => {
        if (error) console.log(error);
        io.emit(SEND_CHAT_MESSAGE, (roomID, message));
      });
    });
  });
};

const getMissedChats = (io, socket) => {
  socket.on(GET_CHAT_MESSAGES_BY_CHAT, (chatID) => {
    fs.readFile(storage, "utf8", (error, file) => {
      if (error) console.log(error);
      const data = JSON.parse(file);
      const index = data.chatRooms.findIndex((room) => {
        return room.id === chatID;
      });
      // console.log("sneding chats:", data.chatRooms[index]);
      socket.emit(GET_CHAT_MESSAGES_BY_CHAT, data.chatRooms[index]);
    });
  });
};

const getChatRooms = (io, socket) => {
  socket.on(GET_LIST_OF_CHATS_BY_MEMBER, (memberID) => {
    fs.readFile(storage, "utf8", (error, file) => {
      if (error) console.log(error);
      const rooms = JSON.parse(file).chatRooms;
      const data = rooms.filter((room) => {
        return room.members.some((member) => {
          return member.id === memberID;
        });
      });

      socket.emit(
        GET_LIST_OF_CHATS_BY_MEMBER,
        data.map((room) => {
          const messages = room.messages;
          var latestMessage = messages[messages.length - 1] || {
            author: "",
            message: "",
            time: "",
          };

          return {
            title: room.name,
            lastMessage: latestMessage,
            id: room.id,
          };
        })
      );
    });
  });
};

module.exports = {
  sendMessage,
  getChatRooms,
  getMissedChats,
};

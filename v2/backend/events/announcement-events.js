const path = require("path");
const fs = require("fs");
const storage = path.join(__dirname, "Storage.json");

const {
  GET_ANNOUNCEMENTS_BY_MEMBER,
  GET_ALL_ANNOUNCEMENTS,
  ADD_ANNOUNCEMENT,
  REMOVE_ANNOUNCEMENT,
} = require("../action.constants");

const sendAnnouncement = (io, socket) => {
  socket.on(GET_ANNOUNCEMENTS_BY_MEMBER, (memberID) => {
    const data = [
      {
        from: "Ellen",
        priority: 1,
        title: "Please Clean Up At The End Of Your Shift",
        description: "We have been getting complaints about not being clean",
        created: new Date().toISOString(),
        dueDate: new Date().toISOString(),
      },
      {
        from: "Ellen",
        priority: 1,
        title: "Dont be late",
        description:
          "Please make sure to arrive 15 min before your shift starts",
        created: new Date().toISOString(),
        dueDate: new Date().toISOString(),
      },
      {
        from: "Ellen",
        priority: 1,
        title: "No Family Swim This Friday",
        description: "Enjoy your holiday!",
        created: new Date().toISOString(),
        dueDate: new Date().toISOString(),
      },
    ];
    socket.emit(GET_ANNOUNCEMENTS_BY_MEMBER, data);
  });
};
const addNewAnnouncement = (socket, io) => {
  socket.on(ADD_ANNOUNCEMENT, (newAnnouncement) => {
    fs.readFile(storage, "utf8", (err, file) => {
      if (err) console.log(error);
      const data = JSON.parse(file);
      const newAnnouncements = [...data.announcements, newAnnouncement];
      data.announcements = newAnnouncements;
      fs.writeFile(storage, JSON.stringify(data), "utf8", (error) => {
        if (error) console.log(error);
        //   io.emit(SEND_CHAT_MESSAGE, (roomID, message));
      });
    });
  });
};

module.exports = {
  sendAnnouncement,
  addNewAnnouncement,
};

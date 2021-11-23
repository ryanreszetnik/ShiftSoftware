const path = require("path");
const fs = require("fs");
const storage = path.join(__dirname, "Storage.json");

const {
  GET_ALL_COWORKERS,
  GET_ALL_MEMBERS,
  GET_MEMBER_BY_ID,
  UPDATE_MEMBER,
} = require("../action.constants");
const getAllMembers = (io, socket) => {
  socket.on(GET_ALL_MEMBERS, () => {
    fs.readFile(storage, "utf8", (error, file) => {
      if (error) console.log(error);
      const data = JSON.parse(file);
      socket.emit(GET_ALL_MEMBERS, data.members);
    });
  });
};
const getAllCoworkers = (io, socket) => {
  socket.on(GET_ALL_COWORKERS, (userID) => {});
};

const getMemberByID = (io, socket) => {
  socket.on(GET_MEMBER_BY_ID, (id) => {
    fs.readFile(storage, "utf8", (error, file) => {
      if (error) console.log(error);
      const data = JSON.parse(file);
      socket.emit(
        GET_MEMBER_BY_ID,
        data.members.find((member) => {
          return member.id === id;
        })
      );
    });
  });
};
const updateMember = (io, socket) => {
  socket.on(UPDATE_MEMBER, (updMember) => {
    fs.readFile(storage, "utf8", (error, file) => {
      if (error) console.log(error);
      const data = JSON.parse(file);
      data.members = data.members.map((member) => {
        if (member.id !== updMember.id) {
          return member;
        }
        return updMember;
      });
      fs.writeFile(storage, JSON.stringify(data), "utf8", (error) => {
        if (error) console.log(error);
        socket.emit(GET_MEMBER_BY_ID, updMember);
      });
    });
  });
};

module.exports = {
  getAllMembers,
  getAllCoworkers,
  updateMember,
  getMemberByID,
};

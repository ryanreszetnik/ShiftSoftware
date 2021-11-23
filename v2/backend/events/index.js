const { sendMessage, getChatRooms, getMissedChats } = require("./chat-events");
const {
  getNextShift,
  getMemberShifts,
  getNextWeekShifts,
  getAllShifts,
  addNewShift,
} = require("./shift-events");
const {
  sendAnnouncement,
  addNewAnnouncement,
} = require("./announcement-events");
const {
  getAllMembers,
  getAllCoworkers,
  updateMember,
  getMemberByID,
} = require("./member-events");
const {
  getAllRequirements,
  addRequirement,
  removeRequirement,
  getAllLocations,
  addLocation,
  removeLocation,
  getAllTypesShifts,
  addTypeShift,
  removeTypeShift,
} = require("./org-events");

const chatEvents = (io, socket) => {
  sendMessage(io, socket);
  getChatRooms(io, socket);
  getMissedChats(io, socket);
};
const shiftEvents = (io, socket) => {
  getNextShift(io, socket);
  getMemberShifts(io, socket);
  getNextWeekShifts(io, socket);
  getAllShifts(io, socket);
  addNewShift(io, socket);
};
const announcementEvents = (io, socket) => {
  sendAnnouncement(io, socket);
  addNewAnnouncement(io, socket);
};

const memberEvents = (io, socket) => {
  getAllMembers(io, socket);
  getAllCoworkers(io, socket);
  updateMember(io, socket);
  getMemberByID(io, socket);
};
const orgEvents = (io, socket) => {
  getAllRequirements(io, socket);
  addRequirement(io, socket);
  removeRequirement(io, socket);
  getAllLocations(io, socket);
  addLocation(io, socket);
  removeLocation(io, socket);
  getAllTypesShifts(io, socket);
  addTypeShift(io, socket);
  removeTypeShift(io, socket);
};
module.exports = {
  chatEvents,
  shiftEvents,
  announcementEvents,
  memberEvents,
  orgEvents,
};

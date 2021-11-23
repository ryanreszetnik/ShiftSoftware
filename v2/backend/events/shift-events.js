const path = require("path");
const fs = require("fs");
const storage = path.join(__dirname, "Storage.json");
const moment = require("moment");
const {
  GET_NEXT_SHIFT_BY_MEMBER,
  GET_ALL_SHIFTS_BY_MEMBER,
  GET_NEXT_WEEK_SHIFTS_BY_MEMBER,
  GET_ALL_SHIFTS,
  ADD_SHIFT,
} = require("../action.constants");

const getAllShifts = (io, socket) => {
  socket.on(GET_ALL_SHIFTS, () => {
    fs.readFile(storage, "utf8", (error, file) => {
      if (error) console.log(error);
      const shifts = JSON.parse(file).shifts;
      socket.emit(GET_ALL_SHIFTS, shifts);
    });
  });
};
const addNewShift = (io, socket) => {
  socket.on(ADD_SHIFT, (newShift) => {
    fs.readFile(storage, "utf8", (err, file) => {
      if (err) console.log(error);
      const data = JSON.parse(file);
      data.shifts = [...data.shifts, newShift];
      fs.writeFile(storage, JSON.stringify(data), "utf8", (error) => {
        if (error) console.log(error);
        //   io.emit(SEND_CHAT_MESSAGE, (roomID, message));
      });
    });
  });
};

const getNextShift = (io, socket) => {
  socket.on(GET_NEXT_SHIFT_BY_MEMBER, (userID) => {
    const now = new Date();
    fs.readFile(storage, "utf8", (error, file) => {
      if (error) console.log(error);
      const shifts = JSON.parse(file).shifts;
      let data = shifts.filter((shift) => {
        return shift.members.some((member) => {
          return member.id === userID;
        });
      });
      let nextShift = undefined;

      shifts.forEach((shift) => {
        const isOrigional = shift.members.some((member) => {
          return member.id === userID;
        });
        shift.times.forEach((time) => {
          const dropped = time.swaps.some((swap) => {
            return swap.original === userID && swap.confirmed;
          });
          const pickedUp = time.swaps.some((swap) => {
            return swap.new === userID;
          });
          if (
            (nextShift === undefined ||
              new Date(nextShift.start) > new Date(time.start)) &&
            ((isOrigional && !dropped) || pickedUp)
          ) {
            nextShift = {
              name: shift.name,
              start: time.start,
              end: time.end,
              positions: shift.members,
              location: shift.location,
              swaps: time.swaps,
            };
          }
        });
      });
      socket.emit(GET_NEXT_SHIFT_BY_MEMBER, nextShift);
    });
  });
};
const getMemberShifts = (io, socket) => {
  socket.on(GET_ALL_SHIFTS_BY_MEMBER, (userID) => {
    fs.readFile(storage, "utf8", (error, file) => {
      if (error) console.log(error);
      const shifts = JSON.parse(file).shifts;
      data = [];
      shifts.forEach((shift) => {
        const isOrigional = shift.members.some((member) => {
          return member.id === userID;
        });
        shift.times.forEach((time) => {
          const dropped = time.swaps.some((swap) => {
            return swap.original === userID && swap.confirmed;
          });
          const pickedUp = time.swaps.some((swap) => {
            return swap.new === userID;
          });
          if ((isOrigional && !dropped) || pickedUp) {
            data.push({
              name: shift.name,
              start: time.start,
              end: time.end,
              positions: shift.members,
              location: shift.location,
              swaps: time.swaps,
            });
          }
        });
      });
      socket.emit(GET_ALL_SHIFTS_BY_MEMBER, data);
    });
  });
};
const getNextWeekShifts = (io, socket) => {
  socket.on(GET_NEXT_WEEK_SHIFTS_BY_MEMBER, (userID) => {
    fs.readFile(storage, "utf8", (error, file) => {
      if (error) console.log(error);
      let shifts = JSON.parse(file).shifts;
      // shifts = shifts.filter((shift) => {
      //   return shift.members.some((member) => {
      //     return member.id === userID;
      //   });
      // });
      const output = [];
      for (let i = 0; i <= 7; i++) {
        const time = moment()
          .add(i, "days")
          .startOf("day")
          .format("ddd, MMM Do");
        output.push({ date: time, shifts: [] });
      }
      const start = moment().startOf("day");
      shifts.forEach((shift) => {
        const isOrigional = shift.members.some((member) => {
          return member.id === userID;
        });
        shift.times.forEach((time) => {
          const diff = moment(time.start).startOf("day").diff(start, "days");
          const dropped = time.swaps.some((swap) => {
            return swap.original === userID && swap.confirmed;
          });
          const pickedUp = time.swaps.some((swap) => {
            return swap.new === userID;
          });
          if (
            diff >= 0 &&
            diff <= 7 &&
            ((isOrigional && !dropped) || pickedUp)
          ) {
            output[diff].shifts.push({
              name: shift.name,
              start: time.start,
              end: time.end,
              positions: shift.members,
              location: shift.location,
              swaps: time.swaps,
            });
          }
        });
      });
      socket.emit(GET_NEXT_WEEK_SHIFTS_BY_MEMBER, output);
    });
  });
};

module.exports = {
  getNextShift,
  getMemberShifts,
  getNextWeekShifts,
  getAllShifts,
  addNewShift,
};

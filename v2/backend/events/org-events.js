const path = require("path");
const fs = require("fs");
const storage = path.join(__dirname, "Storage.json");
const moment = require("moment");
const {
  GET_ALL_REQUIREMENTS,
  ADD_REQUIREMENT,
  DELETE_REQUIREMENT,
  GET_ALL_LOCATIONS,
  ADD_LOCATIOIN,
  DELETE_LOCAITON,
  GET_ALL_TYPES_SHIFTS,
  ADD_TYPE_SHIFT,
  DELETE_TYPE_SHIFT,
} = require("../action.constants");

const getAllRequirements = (io, socket) => {
  socket.on(GET_ALL_REQUIREMENTS, (userID) => {
    fs.readFile(storage, "utf8", (error, file) => {
      if (error) console.log(error);
      const data = JSON.parse(file);
      socket.emit(GET_ALL_REQUIREMENTS, data.qualifications);
    });
  });
};
const addRequirement = (io, socket) => {
  socket.on(ADD_REQUIREMENT, (requirement) => {
    fs.readFile(storage, "utf8", (err, file) => {
      if (err) console.log(error);
      const data = JSON.parse(file);
      const newRequirements = [...data.qualifications, requirement];
      data.qualifications = newRequirements;
      fs.writeFile(storage, JSON.stringify(data), "utf8", (error) => {
        if (error) console.log(error);
        //   io.emit(SEND_CHAT_MESSAGE, (roomID, message));
      });
    });
  });
};
const removeRequirement = (io, socket) => {
  socket.on(DELETE_REQUIREMENT, (requirement) => {
    fs.readFile(storage, "utf8", (err, file) => {
      if (err) console.log(error);
      const data = JSON.parse(file);
      const newRequirements = data.qualifications.filter((qual) => {
        return qual !== requirement;
      });
      data.qualifications = newRequirements;
      fs.writeFile(storage, JSON.stringify(data), "utf8", (error) => {
        if (error) console.log(error);
        //   io.emit(SEND_CHAT_MESSAGE, (roomID, message));
      });
    });
  });
};
const getAllLocations = (io, socket) => {
  socket.on(GET_ALL_LOCATIONS, (userID) => {
    fs.readFile(storage, "utf8", (error, file) => {
      if (error) console.log(error);
      const data = JSON.parse(file);
      socket.emit(GET_ALL_LOCATIONS, data.locations);
    });
  });
};
const addLocation = (io, socket) => {
  socket.on(ADD_LOCATIOIN, (location) => {
    fs.readFile(storage, "utf8", (err, file) => {
      if (err) console.log(error);
      const data = JSON.parse(file);
      const newLocations = [...data.locations, location];
      data.locations = newLocations;
      fs.writeFile(storage, JSON.stringify(data), "utf8", (error) => {
        if (error) console.log(error);
        //   io.emit(SEND_CHAT_MESSAGE, (roomID, message));
      });
    });
  });
};
const removeLocation = (io, socket) => {
  socket.on(DELETE_LOCAITON, (location) => {
    fs.readFile(storage, "utf8", (err, file) => {
      if (err) console.log(error);
      const data = JSON.parse(file);
      const newLocations = data.locations.filter((loc) => {
        return loc.name !== location.name;
      });
      data.locations = newLocations;
      fs.writeFile(storage, JSON.stringify(data), "utf8", (error) => {
        if (error) console.log(error);
        //   io.emit(SEND_CHAT_MESSAGE, (roomID, message));
      });
    });
  });
};
const getAllTypesShifts = (io, socket) => {
  socket.on(GET_ALL_TYPES_SHIFTS, (userID) => {
    fs.readFile(storage, "utf8", (error, file) => {
      if (error) console.log(error);
      const data = JSON.parse(file);
      socket.emit(GET_ALL_TYPES_SHIFTS, data.typesOfShifts);
    });
  });
};
const addTypeShift = (io, socket) => {
  socket.on(ADD_TYPE_SHIFT, (newType) => {
    fs.readFile(storage, "utf8", (err, file) => {
      if (err) console.log(error);
      const data = JSON.parse(file);
      const newTypes = [...data.typesOfShifts, newType];
      data.typesOfShifts = newTypes;
      fs.writeFile(storage, JSON.stringify(data), "utf8", (error) => {
        if (error) console.log(error);
        //   io.emit(SEND_CHAT_MESSAGE, (roomID, message));
      });
    });
  });
};
const removeTypeShift = (io, socket) => {
  socket.on(DELETE_TYPE_SHIFT, (typeShift) => {
    fs.readFile(storage, "utf8", (err, file) => {
      if (err) console.log(error);
      const data = JSON.parse(file);
      const newLocations = data.typesOfShifts.filter((type) => {
        return type !== typeShift;
      });
      data.typesOfShifts = newLocations;
      fs.writeFile(storage, JSON.stringify(data), "utf8", (error) => {
        if (error) console.log(error);
        //   io.emit(SEND_CHAT_MESSAGE, (roomID, message));
      });
    });
  });
};

module.exports = {
  getAllRequirements,
  addRequirement,
  removeRequirement,
  getAllLocations,
  addLocation,
  removeLocation,
  getAllTypesShifts,
  addTypeShift,
  removeTypeShift,
};

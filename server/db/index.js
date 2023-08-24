//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Message = require("./models/message");
const Safespace = require("./models/safespace");

//associations could go here!
User.hasMany(Message);
Message.belongsTo(User);

Safespace.hasMany(Message);
Message.belongsTo(Safespace);

module.exports = {
  db,
  models: {
    User,
    Message,
    Safespace,
  },
};

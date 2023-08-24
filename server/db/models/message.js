const Sequelize = require("sequelize");
const db = require("../db");
const { TEXT, INTEGER } = Sequelize;

const Message = db.define("message", {
  content: {
    type: TEXT,
  },
});

module.exports = Message;

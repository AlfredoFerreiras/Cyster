const Sequelize = require("sequelize");
const db = require("../db");
const { STRING } = Sequelize;

const Safespace = db.define("safespace", {
  topic: {
    type: STRING,
  },
});

module.exports = Safespace;

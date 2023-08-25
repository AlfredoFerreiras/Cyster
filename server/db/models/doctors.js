const Sequelize = require("sequelize");
const db = require("../db");

const GYNDoctor = db.define("gynDoctor", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  website: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = GYNDoctor;

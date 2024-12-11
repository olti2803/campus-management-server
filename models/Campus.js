const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Campus = sequelize.define("Campus", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: "https://via.placeholder.com/200",
  },
});

module.exports = Campus;

const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  gpa: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
  campusId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Allow students without a campus
    references: {
      model: "Campuses", // Must match the table name of the Campus model
      key: "id",
    },
  },
});

module.exports = Student;

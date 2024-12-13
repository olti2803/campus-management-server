const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const Campus = require("./models/Campus");
const Student = require("./models/Student");
const campusesRouter = require("./routes/campuses");
const studentsRouter = require("./routes/students");

const app = express();

// Enable CORS
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// Establish Relationships
Campus.hasMany(Student, { foreignKey: "campusId", onDelete: "CASCADE" }); // A campus has many students
Student.belongsTo(Campus, { foreignKey: "campusId", onDelete: "SET NULL" }); // A student belongs to a campus

// Routes
app.use("/api/campuses", campusesRouter);
app.use("/api/students", studentsRouter);

// Sync Database
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced!");
});

// Start Server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});

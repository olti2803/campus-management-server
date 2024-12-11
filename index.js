const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const Campus = require("./models/Campus");
const campusesRouter = require("./routes/campuses");

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());
app.use("/api/campuses", campusesRouter);

// Sync Database
sequelize.sync().then(() => {
  console.log("Database synced!");
});

// Start Server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});

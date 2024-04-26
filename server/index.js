const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");
const loger=require("morgan");
app.use(loger("dev"))

// ====================  GLOBAL MIDDLEWARE ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED
const cors = require("cors");
app.use(cors()); // ALLOW HTTP REQUESTS LOCAL HOSTS

// ====================  Required Module ====================
const auth = require("./routes/Auth");
const course = require("./routes/instructorCourse");
const adminCourse = require("./routes/adminCourse");
const studentCourse = require("./routes/studentCourse");
const manageinstructor = require("./routes/Manage_instructor");
const assigninstructors = require("./routes/Assign_instructor");

// ====================  HTTPS SERVER  ====================
// using Https with Tls for secure communication
const TLS_OPTIONS = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt"),
};

// ====================  RUN THE APP  ====================
const server = https.createServer(TLS_OPTIONS, app);
app.listen(4000, "localhost", () => {
  console.log("Server is running on port 4000");
  console.log("https://localhost:4000");
});

// ====================  API ROUTES [ ENDPOINTS ]  ====================
app.use("/auth", auth);
app.use("/course", course);
app.use("/studentCourse", studentCourse);
app.use("/adminCourse", adminCourse);
app.use("/manageinstructor", manageinstructor);
app.use("/assigninstructors", assigninstructors);
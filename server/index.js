const express = require("express");
const app = express();

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





// ====================  RUN THE APP  ====================
app.listen(4000, "localhost", () => {
  console.log("SERVER IS RUNNING ");
});

// ====================  API ROUTES [ ENDPOINTS ]  ====================
app.use("/auth", auth);
app.use("/course", course);
app.use("/studentCourse", studentCourse);
app.use("/adminCourse", adminCourse);
app.use("/manageinstructor", manageinstructor);
app.use("/assigninstructors", assigninstructors);




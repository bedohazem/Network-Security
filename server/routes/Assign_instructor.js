const router = require("express").Router();
const connection = require("../db/connection");
const admin = require("../middleware/Admin");
const util = require("util"); // helper

//ASSIGN INSTRUCTOR TO COURSE
function assignInstructorToCourse(userId, courseId, callback) {
  // Check if the instructor and course exist
  const userQuery = 'SELECT * FROM users WHERE id = ?';
  const courseQuery = 'SELECT * FROM courses WHERE id = ?';
  connection.query(userQuery, [userId], (error, userResults) => {
    if (error) return callback(error);
    if (userResults.length === 0) {
      const error = new Error('instructor not found');
      error.status = 404;
      return callback(error);
    }
    connection.query(courseQuery, [courseId], (error, courseResults) => {
      if (error) return callback(error);
      if (courseResults.length === 0) {
        const error = new Error('Course not found');
        error.status = 404;
        return callback(error);
      }

      // Check if the instructor assigned for the course
      const assignningQuery = 'SELECT * FROM instructor_course WHERE userId = ? AND courseId = ?';
      connection.query( assignningQuery, [userId, courseId], (error, assignningResults) => {
        if (error) return callback(error);
        if (assignningResults.length > 0) {
          const error = new Error('instructor already assigned for this course');
          error.status = 400;
          return callback(error);
        }

        // Register the user for the course
        const insertQuery = 'INSERT INTO instructor_course (userId, courseId) VALUES (?, ?)';
        connection.query(insertQuery, [userId, courseId], (error, results) => {
          if (error) return callback(error);
          callback(null, results);
        });
      });
    });
  });
}

router.post('', (req, res) => {
  const userId = req.body.userId;
  const courseId = req.body.courseId;

  assignInstructorToCourse(userId, courseId, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(error.status || 500).send(error.message);
    }
    res.send(`Successfully assigned course ${courseId} for instructor ${userId}`);
  });
});

module.exports = router;
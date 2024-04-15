const router = require("express").Router();
const connection = require("../db/connection");
const util = require("util"); // helper/


//Show Registered courses with grades
function view(userId, callback) {
  // Check if the user exists
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [userId], (error, results) => {
    if (error) return callback(error);
    if (results.length === 0) {
      const error = new Error('User not found');
      error.status = 404;
      return callback(error);
    }

    // Retrieve the courses registered by the user and their grades
    const coursesQuery = `
      SELECT courses.id, courses.name, user_course.grade
      FROM courses
      JOIN user_course
      ON courses.id = user_course.courseId
      WHERE user_course.userId = ?
    `;
    connection.query(coursesQuery, [userId], (error, results) => {
      if (error) return callback(error);
      const courses = results.map((course) => {
        return {
          id: course.id,
          name: course.name,
          grade: course.grade
        };
      });
      callback(null, courses);
    });
  });
}

router.get('/:userId', function(req, res) {
  const userId = req.params.userId;
  view(userId, function(error, courses) {
    if (error) {
      console.error(error);
      return res.status(error.status || 500).send(error.message);
    }
    res.send(courses);
  });
});


//Register courses
function registerCourse(userId, courseId, callback) {
  // Check if the user and course exist
  const userQuery = 'SELECT * FROM users WHERE id = ?';
  const courseQuery = 'SELECT * FROM courses WHERE id = ?';
  connection.query(userQuery, [userId], (error, userResults) => {
    if (error) return callback(error);
    if (userResults.length === 0) {
      const error = new Error('User not found');
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

      // Check if the user is already registered for the course
      const registrationQuery = 'SELECT * FROM user_course WHERE userId = ? AND courseId = ?';
      connection.query(registrationQuery, [userId, courseId], (error, registrationResults) => {
        if (error) return callback(error);
        if (registrationResults.length > 0) {
          const error = new Error('User already registered for this course');
          error.status = 400;
          return callback(error);
        }

        // Register the user for the course
        const insertQuery = 'INSERT INTO user_course (userId, courseId) VALUES (?, ?)';
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

  registerCourse(userId, courseId, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(error.status || 500).send(error.message);
    }
    res.send(`Successfully registered course ${courseId} for user ${userId}`);
  });
});

module.exports = router;
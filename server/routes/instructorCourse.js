const router = require("express").Router();
const connection = require("../db/connection");
const instructor = require("../middleware/Instructor");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper

//view instructor courses
function viewInstructorCourses(userId, callback) {            ///update
  // Check if the course exists
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [userId], (error, results) => {
    if (error) return callback(error);
    if (results.length === 0) {
      const error = new Error('user not found');
      error.status = 404;
      return callback(error);
    }

    // Retrieve the students enrolled in the course
    const coursesQuery = `
    SELECT courses.name , courses.id FROM courses
    JOIN instructor_course 
    on instructor_course.courseId = courses.id 
    WHERE instructor_course.userId = ?
    `;
    connection.query(coursesQuery, [userId], (error, results) => {
      if (error) return callback(error);
      const courses = results.map((course) => {
        return {
          id: course.id,
          name: course.name
        };
      });
      callback(null, courses);
    });
  });
}

//view enrolled students
function viewEnrolledStudents(courseId, callback) {
  // Check if the course exists
  const query = 'SELECT * FROM courses WHERE id = ?';
  connection.query(query, [courseId], (error, results) => {
    if (error) return callback(error);
    if (results.length === 0) {
      const error = new Error('Course not found');
      error.status = 404;
      return callback(error);
    }

    // Retrieve the students enrolled in the course
    const studentsQuery = `
      SELECT users.id, users.name , user_course.id as grade_id , user_course.grade 
      FROM users
      JOIN user_course
      ON users.id = user_course.userId
      WHERE user_course.courseId = ?
    `;
    connection.query(studentsQuery, [courseId], (error, results) => {
      if (error) return callback(error);
      const students = results.map((student) => {
        return {
          id: student.id,
          name: student.name,
          grade_id:student.grade_id ,
          grade:student.grade
        };
      });
      callback(null, students);
    });
  });
}

router.get('/:courseId',instructor, (req, res, next) => {
  const courseId = req.params.courseId;
  viewEnrolledStudents(courseId, (error, students) => {
    if (error) return next(error);
    res.json(students);
  });
});

router.get('/instructor_courses/:userId',instructor, (req, res, next) => {
  const userId = req.params.userId;
  viewInstructorCourses(userId, (error, courses) => {
    if (error) return next(error);
    res.json(courses);
  });
});



//set grades 
router.put("/:id",instructor,async(req,res) =>{
    try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const query = util.promisify(connection.query).bind(connection);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
         const grade = await query("select * from user_course where id = ?", [
          req.params.id,
        ]);
        if (!grade[0]) {
           return res.status(404).json({ ms: "grade not found !" });
          }
    
          const gradeObj = {
            grade: req.body.grade
          };
    
        
          await query("update user_course set  ? where id= ?", [gradeObj, grade[0].id]);
    
          res.status(200).json({
            msg: "grade updated successfully",
          });
        } catch (err) {
          res.status(500).json(err);
        }
      }
);







module.exports = router;
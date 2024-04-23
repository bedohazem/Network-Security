const router = require("express").Router();
const connection = require("../db/connection");
const admin = require("../middleware/Admin");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper

// Admin [Create, Update, Delete, List]

//create course
router.post("", admin,body("name").isString().withMessage("please enter a valid course name")
.isLength({min:10}).withMessage("course name should be at least 10 characters") ,

body("code").isString().withMessage("please enter a valid code")
.isLength({min:4}).withMessage("code should be at least 4 characters"),

async(req, res) => {
    // 1- VALIDATION REQUEST [manual, express validation]
    try{
        const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     //2-PREPARE COURSE OBJECT
     const course ={
        name: req.body.name,
        code: req.body.code,
       }
       //3-INSERT COURSE INTO DB
  const query = util.promisify(connection.query).bind(connection); 
  await query("insert into courses set ?", course);
    res.status(200).json({
        msg: "course created successfully ^^",
    });
    }
    catch (err) {
        res.status(500).json(err);
      }
});

//update course
router.put("/:id",admin,async(req,res) =>{
  try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(connection.query).bind(connection);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

       const course = await query("select * from courses where id = ?", [
        req.params.id,
      ]);
      if (!course[0]) {
        return  res.status(200).json({ ms: "course not found !" });
        }
  
        const courseObj = {
          name: req.body.name,
          code: req.body.code,
        };
  
      
        await query("update courses set  ? where id= ?", [courseObj, course[0].id]);
  
        res.status(200).json({
          msg: "course updated successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
);

//delete course
router.delete("/:id", admin,
async(req, res) => {
  try{
    //1-CHECK IF COURSE EXISTS OR NOT
    const query = util.promisify(connection.query).bind(connection);
    const course = await query("select * from courses where id = ?", [req.params.id,]);

    if(!course[0]){
        res.status(404).json[{ msg: "course not found" }];
    }
    
   //2-REMOVE COURSE 
  await query("delete from courses where id =?",course[0].id);
  res.status(200).json({
    msg: "course deleted successfully ^^",
});

  }catch (err) {
        res.status(500).json(err);
      }
});

//list courses
router.get("",async (req, res) => {
  const query = util.promisify(connection.query).bind(connection);
  const courses = await query("select * from courses ");
res.status(200).json(courses);
});

module.exports = router;
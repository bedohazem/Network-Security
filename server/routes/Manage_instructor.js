const router = require("express").Router();
const connection = require("../db/connection");
const admin = require("../middleware/Admin");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const util = require("util"); // helper
const jwt = require('jsonwebtoken');

// Admin [Create, Update, Delete, List]

//create instructor
router.post("", admin,
async(req, res) => {
    // 1- VALIDATION REQUEST [manual, express validation]
    try{
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
     
      //2-PREPARE INSTRUCTOR OBJECT
      let payload = {
        name: req.body.name,
        email: req.body.email,
        role: "instructor",
      }
      const instructor ={
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        phone: req.body.phone,
        token: jwt.sign(payload, "secretKey"), // JSON WEB TOKEN, CRYPTO -> RANDOM ENCRYPTION STANDARD
        role: 2
      }
      
      //3-INSERT INSTRUCTOR INTO DB
      const query = util.promisify(connection.query).bind(connection); 
      await query("insert into users set ?", instructor);
      res.status(200).json({
          msg: "instructor created successfully ^^",
      });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//update instructor
router.put("/:id",admin,async(req,res) =>{
  try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(connection.query).bind(connection);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //2-CHECK IF INSTRUCTOR EXISTS OR NOT
       const instructor = await query("select * from users where id = ?", [
        req.params.id,
      ]);
      if (!instructor[0]) {
          res.status(404).json({ ms: "instructor not found !" });
        }
       //2-PREPARE INSTRUCTOR OBJECT
        const instructorObj = {
          name: req.body.name,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10),
          phone: req.body.phone,
        };
  
      
        await query("update users set  ? where id= ?", [instructorObj, instructor[0].id]);
  
        res.status(200).json({
          msg: "instructor updated successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
);

//delete instructor
router.delete("/:id", admin,
async(req, res) => {
  try{
    //1-CHECK IF INSTRUCTOR EXISTS OR NOT
    const query = util.promisify(connection.query).bind(connection);
    const instructor = await query("select * from users where id = ?", [req.params.id,]);

    if(!instructor[0]){
        res.status(404).json[{ msg: "instructor not found" }];
    }
    
   //2-REMOVE INSTRUCTOR
  await query("delete from users where id =?",instructor[0].id);
  res.status(200).json({
    msg: "instructor deleted successfully ^^",
});

  }catch (err) {
        res.status(500).json(err);
      }
});

//list instructor
router.get("",admin,async (req, res) => {
  const query = util.promisify(connection.query).bind(connection);

  const instructors = await query("select * from `users` where `role` = 2 ");

res.status(200).json(instructors);
});

module.exports = router;
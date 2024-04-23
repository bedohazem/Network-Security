const connection = require("../db/connection");
const util = require("util"); // helper
const jwt = require('jsonwebtoken');

const instructor = async (req, res, next) => {
  const query = util.promisify(connection.query).bind(connection);
  const { token } = req.headers;
  const instructor = await query("select * from `users` where `token` = ?", [token]);

  if (instructor[0]) {
    decodedPayload = jwt.verify(instructor[0].token, "secretKey"); 
    if(decodedPayload.role == "instructor" || decodedPayload.role == "admin"){
      next();
    }else{
      res.status(403).json({
        msg: "you are not authorized to access this route !",
      });    
  }
  }else{
      res.status(403).json({
        msg: "you are not authorized to access this route !",
      });    
  }
  
};

module.exports = instructor;
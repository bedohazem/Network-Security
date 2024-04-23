const connection = require("../db/connection");
const util = require("util"); // helper
const jwt = require('jsonwebtoken');

const admin = async (req, res, next) => {

  const query = util.promisify(connection.query).bind(connection);
  const { token } = req.headers;
  const admin = await query("select * from `users` where `token` = ?", [token]);

  if (admin[0]) {

    decodedPayload = jwt.verify(admin[0].token, "secretKey"); 
    if(decodedPayload.role == "admin"){
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

module.exports = admin;
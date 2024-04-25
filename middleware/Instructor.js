const connection = require("../db/connection");
const util = require("util"); // helper

const instructor = async (req, res, next) => {
  const query = util.promisify(connection.query).bind(connection);
  const { token } = req.headers;
  const instructor = await query("select * from users where token = ?", [token]);
  if (instructor[0] && instructor[0].role == "2") {
    next();
  } else {
    res.status(403).json({
      msg: "you are not authorized to access this route !",
    });
  }
};

module.exports = instructor;
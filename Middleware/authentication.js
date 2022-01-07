//dependencies required for the function to work
const jwt = require("jsonwebtoken");

//The below function is used as middleware for authentication and authorization
//exported as default
//if no token is provided, authorization section will not exist
//401 is status for "unauthorized"
module.exports = function (req, res, next) {
  if (!req.headers.authorization)
    return res.status(401).send("Access Denied! No token provided");
  const jwt_token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(jwt_token, process.env.App_jwtPrivateKey);
    req.jwtData = data;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

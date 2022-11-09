const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/credentials");

function checkIfAdmin(req, res, next) {
  const getAuth = req.header("Authorization");
  if (!getAuth) {
    return res.status(401).json({
      message: "No token header",
    });
  }

  const token = getAuth.split(" ").pop();
  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin")
      return res.status(401).json({
        message: "Unauthorized!",
      });
    // add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({
      msg: "Token is not valid",
    });
  }
}

module.exports = checkIfAdmin;

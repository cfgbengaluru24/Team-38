const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(errorHandler(402, "Authorization header missing"))
  }

  const token = authHeader.split(" ")[1];
  if (!token) return next(errorHandler(402, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };

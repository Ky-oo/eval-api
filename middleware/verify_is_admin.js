const jwt = require("jsonwebtoken");

function verifyIsAdmin(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.decode(token);
  if (!user.is_admin) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
  next();
}
module.exports = verifyIsAdmin;

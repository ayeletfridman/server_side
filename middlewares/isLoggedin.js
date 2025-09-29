const { activeTokens } = require("../data/db");

function isLoggedin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "missing token" });
  }

  const tokenExists = activeTokens.some((t) => t.token === token);

  if (!tokenExists) {
    return res.status(401).json({ message: "unauthorized" });
  }
  next();
}

module.exports = { isLoggedin };

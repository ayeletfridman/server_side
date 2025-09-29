const crypto = require("crypto");

function generateToken(length = 48) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

module.exports = { generateToken };

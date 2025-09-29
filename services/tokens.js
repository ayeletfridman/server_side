// src/services/tokens.js
const { activeTokens } = require("../data/db");

// פונקציה להוספת טוקן למערך
function addToken(username, token) {
  activeTokens.push({
    username,
    token,
    createdAt: new Date().toISOString(),
  });
}

// פונקציה להסרת טוקן מהמערך
function removeToken(token) {
  const index = activeTokens.findIndex((t) => t.token === token);
  if (index !== -1) {
    activeTokens.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = { addToken, removeToken };

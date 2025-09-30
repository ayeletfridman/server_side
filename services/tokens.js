const { activeTokens } = require("../data/db");

function addToken(username, token) {
  activeTokens.push({
    username,
    token,
    createdAt: new Date().toISOString(),
  });
}

function removeToken(token) {
  const index = activeTokens.findIndex((t) => t.token === token);
  if (index !== -1) {
    activeTokens.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = { addToken, removeToken };

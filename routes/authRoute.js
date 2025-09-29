const express = require("express");
const router = express.Router();

const { users, activeTokens } = require("../data/db");
const { generateToken } = require("../utils/generateToken");
const { verifyPassword } = require("../utils/password");
const { addToken, removeToken } = require("../services/tokens");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const token = generateToken(48);
    addToken(username, token); 

    return res.status(200).json({
      token,
      user: { username },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "internal server error" });
  }
});

router.post("/logout", (req, res) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(400).json({ message: "missing token" });

  const removed = removeToken(token);
  if (!removed) return res.status(404).json({ message: "token not found" });

  return res.status(200).json({ message: "logged out successfully" });
});

module.exports = router;
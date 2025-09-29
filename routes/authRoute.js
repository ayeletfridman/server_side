const express = require("express");
const router = express.Router();

const { users, activeTokens } = require("../data/db");
const { generateToken } = require("../utils/generateToken");
const { verifyPassword } = require("../utils/password");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password are required" });
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
    activeTokens.push({
      username,
      token,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({
      token,
      user: { username },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "internal server error" });
  }
});

module.exports = router;

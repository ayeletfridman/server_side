const express = require("express");
const router = express.Router();
const { books } = require("../data/db");
const { isLoggedin } = require("../middlewares/isLoggedin");

// router.get("/", (req, res) => {
//   res.json(books);
// });
router.get("/", isLoggedin, (req, res) => {
  res.json(books);
});

module.exports = router;

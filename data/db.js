const bcrypt = require("bcrypt");

const books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 2, title: "You Don't Know JS", author: "Kyle Simpson", year: 2015 },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    year: 1999,
  },
];

const passwordPlain = "123456";
const passwordHash = bcrypt.hashSync(passwordPlain, 10);

const users = [{ username: "sara", passwordHash }];

const activeTokens = [];

module.exports = { books, users, activeTokens };

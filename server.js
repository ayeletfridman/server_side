const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const rootRouter = require("./routes/index");
app.use("/", rootRouter);

const booksRouter = require("./routes/bookRoute");
app.use("/api/books", booksRouter);

const authRouter = require("./routes/authRoute");
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

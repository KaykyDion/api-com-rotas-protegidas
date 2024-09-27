const express = require("express");

const authRouter = require("./routes/auth");
const apiRouter = require("./routes/api");
const adminRouter = require("./routes/admin");

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running: httpl://localhost:${PORT}`)
);

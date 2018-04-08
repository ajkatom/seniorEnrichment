const express = require("express");
const app = express();
const path = require("path");
app.use(require("body-parser").json());

app.use("/api", require("./api"));
app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

module.exports = app;

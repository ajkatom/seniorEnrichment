const express = require("express");
const app = express();
const path = require("path");
app.use(require("body-parser").json());

app.use("/api", require("./api"));
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/styles", express.static(path.join(__dirname, "../styles")));
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || "Internal server error.")
);
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

module.exports = app;

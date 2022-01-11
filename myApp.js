require("dotenv").config();
var express = require("express");
var app = express();

app.use(express.static(__dirname));

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  }
  res.json({ message: "Hello json" });
});

app.get("/", (req, res) =>
  res.sendFile((absolutePath = __dirname + "/views/index.html"))
);

console.log("Hello World");

module.exports = app;

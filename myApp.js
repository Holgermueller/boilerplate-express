require("dotenv").config();
var express = require("express");
let bodyParser = require("body-parser");
var app = express();

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    console.log("Middle ware req.time = " + req.time);
    next();
  },
  (req, res) => {
    res.json({
      time: req.time,
    });
  }
);

app.use((req, res, next) => {
  let string = `${req.method} ${req.path} - ${req.ip} `;
  console.log(string);
  next();
});

console.log("Hello World");

app.get("/", (req, res) =>
  res.sendFile((absolutePath = __dirname + "/views/index.html"))
);

app.use(express.static(__dirname));

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  }
  res.json({ message: "Hello json" });
});

app.get("/:word/echo", (req, res) => {
  let word = req.params.word;

  let jsonObj = { echo: word, echo: word };
  res.send(jsonObj);
});

app.get("/name", (req, res) => {
  let firstName = req.query.first;
  let lastName = req.query.last;

  res.json({
    name: `${firstName} ${lastName}`,
  });
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post("/name", (req, res) => {
  let string = req.body.first + " " + req.body.last;
  res.json({
    name: string,
  });
});

module.exports = app;

require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
const {
  signUpPeople,
  login,
  getSession,
  logout
} = require("./controller/controller");
const { display } = require("./controller/cards");

///// ws

////

app.use(express.json());

const { SESSION_SECTRET, STRING } = process.env;
app.use(express.json());

massive(STRING).then(db => {
  app.set("db", db);
  console.log("database");
});

app.use(
  session({
    secret: SESSION_SECTRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000
    }
  })
);

PORT = 3004;

app.post("/auth/signup", signUpPeople);
app.post("/auth/login", login);
app.get("/api/people", display);
app.get("/api/user", getSession);
app.get("/", logout);

app.listen(PORT, () => console.log(`server on ${PORT}`));

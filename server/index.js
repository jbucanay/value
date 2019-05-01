require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
const { signUpPeople, login } = require("./controller/controller");

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

app.listen(PORT, () => console.log(`server on ${PORT}`));

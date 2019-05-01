require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
const { signUpPeople, login } = require("./controller/controller");

const { PORT, SESSION_SECTRET, STRING } = process.env;
app.use(express.json());

massive(STRING).then(db => {
  app.set("db", db);
  console.log("database");
});

app.use(
  session({
    secret: SESSION_SECTRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000
    }
  })
);

app.post("/auth/signup", signUpPeople);
app.post("/auth/login", login);

const server = app.listen(PORT, () =>
  console.log(`server on ${server.address().port}`)
);

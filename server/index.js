require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const { signUpPeople } = require("./controller/controller");

const { PORT, SECRET, STRING } = process.env;
app.use(express.json());

massive(STRING).then(db => {
  app.set("db", db);
  console.log("database");
});

app.post("/auth/signup", signUpPeople);

const server = app.listen(PORT, () =>
  console.log(`server on ${server.address().port}`)
);

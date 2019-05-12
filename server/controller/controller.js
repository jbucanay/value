const bcrypt = require("bcryptjs");

module.exports = {
  signUpPeople: async (req, res) => {
    const db = req.app.get("db");

    const { firstName, lastName, url, username, password } = req.body;

    const check = await db.verify(username).catch(err => console.log(err));
    if (check[0]) {
      res.status(409).json("username taken");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const register = await db
        .createPeople([firstName, lastName, url, username, hash])
        .catch(err => console.log(err));

      req.session.user = {
        first: register[0].first_name,
        second: register[0].last_name,
        image: register[0].image,
        people_id: register[0].people_id
      };
      res.status(200).json(req.session.user);
    }
  },

  login: async (req, res) => {
    const db = req.app.get("db");

    const { username, password } = req.body;

    const results = await db.verify(username).catch(err => console.log(err));

    if (results[0]) {
      const check = await bcrypt.compare(password, results[0].password);
      if (check) {
        req.session.user = {
          first: results[0].first_name,
          second: results[0].last_name,
          image: results[0].image,
          people_id: results[0].people_id
        };

        res.status(200).json(req.session.user);
      } else {
        res.status(409).json("wrong username or password");
      }
    } else {
      res.status(409).json("wrong username or password");
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200);
  },

  getSession: (req, res) => {
    res.status(200).json(req.session.user);
  },
  deleteAccount: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;

    db.pdelete(+id);
    res.json("success");
  },

  update: async (req, res) => {
    const db = req.app.get("db");
    const { name, last, username, password, image } = req.body;
    const { id } = req.params;
    if (name !== "" && last === "") {
      let NewName = await db.updateName([name, +id]);
      console.log("one");
      res.json(NewName[0]);
    }

    if (last !== "" && name === "") {
      let lastName = await db.updateLast([last, +id]);
      console.log("two");
      res.json(lastName[0]);
    } else if (last !== "" && name !== "") {
      let firstAndLast = await db.firstLast([name, last, +id]);
      console.log("three");
      res.json(firstAndLast[0]);
    }
  }
};

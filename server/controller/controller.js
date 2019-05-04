const bcrypt = require("bcryptjs");

module.exports = {
  signUpPeople: async (req, res) => {
    const db = req.app.get("db");
    const { firstName, lastName, image, admin, username, password } = req.body;

    const check = await db.verify(username).catch(err => console.log(err));
    if (check[0]) {
      res.status(409).json("username taken");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const register = await db
        .createPeople([firstName, lastName, image, admin, username, hash])
        .catch(err => console.log(err));

      req.session.user = {
        first: register[0].first_name,
        second: register[0].last_name,
        image: register[0].image,
        points: register[0].points
      };
      res.status(200).json(req.session.user);
    }
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    console.log(req.body);
    const { username, password } = req.body;

    const results = await db.verify(username).catch(err => console.log(err));

    if (results[0]) {
      const check = await bcrypt.compare(password, results[0].password);
      if (check) {
        req.session.user = {
          first: results[0].first_name,
          second: results[0].last_name,
          image: results[0].image,
          points: results[0].points
        };
        console.log(`session created with test ${req.session.user}`);
        res.status(200).json(req.session.user);
      } else {
        res.status(409).json("wrong username or password");
      }
    } else {
      res.status(409).json("wrong username or password");
    }

    console.log(" this works" + req.session.user);
  },
  logout: (req, res) => {
    console.log(req.session);
    req.session.destroy();
    res.status(200);
  },

  getSession: (req, res) => {
    res.status(200).json(req.session.user);
  }
};

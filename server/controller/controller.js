const bcrypt = require("bcryptjs");

module.exports = {
  signUpPeople: async (req, res) => {
    const db = req.app.get("db");
    const { firstName, lastName, image, admin, username, password } = req.body;

    let results = await db
      .createPeople([firstName, lastName, image, admin, username, password])
      .catch(err => console.log(err));

    res.status(200).json(results);
  }
};

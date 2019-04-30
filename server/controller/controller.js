const bcrypt = require("bcryptjs");

module.exports = {
  signUpPeople: async (req, res) => {
    const db = req.app.get("db");
    const { firstName, lastName, image, username, password } = req.body;
    console.log(req.body);
  }
};

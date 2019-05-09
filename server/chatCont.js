module.exports = {
  create: async (req, res) => {
    const db = req.app.get("db");
    const Hold = [req.body];

    const { message, day, people_id } = req.body;
    const results = await db
      .message([message, day, people_id])
      .catch(err => console.log(err));
    console.log(results);
  }
};

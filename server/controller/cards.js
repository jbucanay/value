module.exports = {
  display: async (req, res) => {
    const db = req.app.get("db");
    const results = await db.getAll().catch(err => console.log(err));
    console.log(results);
    res.status(200).json(results);
  }
};

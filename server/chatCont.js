module.exports = {
  create: async (req, res) => {
    const db = req.app.get("db");

    const { message, day, people_id, time } = req.body;
    const results = await db
      .message([message, day, people_id, time])
      .catch(err => console.log(err));
    let date = new Date().getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let today = days[date];

    if (results[0].day === today) {
      let second = await db.getDay(today);
      let archive = await db.delete(today);

      res.json(second);
    }
  }
};

INSERT into messages (message, day, people_id, time) VALUES ($1, $2, $3, $4) RETURNING *; 
INSERT INTO people (first_name, last_name, image, is_admin, username, password ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
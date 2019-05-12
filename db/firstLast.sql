update people set first_name = $1, last_name = $2
where people_id = $3 returning*;
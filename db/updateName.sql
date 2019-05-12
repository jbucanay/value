UPDATE people 
SET first_name = $1
WHERE
people_id = $2
returning*;
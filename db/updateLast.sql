UPDATE people 
SET last_name = $1
WHERE
people_id = $2
returning*;
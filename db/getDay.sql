select p.first_name, p.last_name, m.message, m.day, m.time, p.image
from people p
join messages m
on p.people_id = m.people_id
where day = $1;

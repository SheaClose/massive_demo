insert into cars (make, model, year)
values ($1, $2, $3) returning *;
select * from cars;
require("dotenv").config();
const express = require("express"),
  app = express(), // {}
  //   { json } = require("body-parser"),
  //   cors = require("cors"),
  port = 3001,
  massive = require("massive");

massive(process.env.CONNECTION_STRING).then(function(dbInstance) {
  app.set("db", dbInstance);
});
// // var key = 'someprotectedval'
// app.use(cors());
// app.use(json());

app.get("/api/cars", function(req, res) {
  const db = req.app.get("db");
  if (req.query.make) {
    db
      .run("select * from cars where make = $1", req.query.make)
      .then(resp => res.status(200).json(resp));
  } else {
    db.run("select * from cars;").then(resp => {
      return res.status(200).json(resp);
    });
  }
});
app.get("/api/cars/:id", function(req, res) {
  console.log("req: ", Number(req.params.id));
  const db = req.app.get("db");
  db
    .run("select * from cars where id = $1", [Number(req.params.id)])
    .then(console.log)
    .catch(console.log);
});
app.post("/api/cars", function(req, res) {
  const db = req.app.get("db");
  const obj = {
    make: req.query.make,
    model: req.query.model,
    year: Number(req.query.year)
  };
  db
    .run(
      "insert into cars (make, model, year) values (${make}, ${model}, ${year})",
      obj
    )
    .then(console.log)
    .catch(console.log);
});

app.listen(port, () =>
  console.log(`This is Dr Crane... I'm listening at port ${port}`)
);

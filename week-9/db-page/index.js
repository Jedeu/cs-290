const express = require('express')
const mysql = require('./dbcon.js');
const bodyParser = require('body-parser');
let moment = require('moment');
const app = express();
const port = 1992;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  let context = {};
  mysql.pool.query("SELECT * FROM workouts", (err, rows, fields) => {
    rows.forEach((row) => {
      row.date = moment(row.date).format("MM-DD-YYYY");
    });
    context.results = rows;
    res.render('index', context)
  });
});

app.post('/', (req, res) => {
  // We have to fit everything under this post request (no DELETE or PUT allowed apparently)
  // So we have to parse the action from the POST request to use the right handler
  if (req.body.action == "add") {
    let newEntry = Object.assign({}, req.body);
    delete newEntry["action"];

    newEntry.date = moment(req.body.date, "MM-DD-YYYY").toDate();
    mysql.pool.query("INSERT INTO workouts SET ?", newEntry, (err, results, fields) => {
      if (err) {
        res.json({error: err});
      }
      res.json(results);
    });
  } else if (req.body.action == "delete") {
    mysql.pool.query(`DELETE FROM workouts WHERE id = ${req.body.id}`, (err, results, fields) => {
      if (err) res.json({error: err})

      res.json(results);
    })
  } else if (req.body.action == "edit") {
    let entryToUpdate = Object.assign({}, req.body);
    
    delete entryToUpdate["action"];
    delete entryToUpdate["id"];

    entryToUpdate.date = moment(req.body.date, "MM-DD-YYYY").toDate();
    mysql.pool.query(`UPDATE workouts SET ? WHERE id = ${req.body.id}`, entryToUpdate, (err, results, fields) => {
      if (err) {
        res.json({error: err});
      }
      res.json(results);
    });
  }

});

app.get('/reset-table', (req, res, next) => {
  let context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", (err) => { //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, (err) => {
      context.message = "Table reset";
      res.render('index', context);
    });
  });
});

app.listen(port, () => console.log(`db-page listening on port ${port}!`));
let express = require('express')
let mysql = require('./dbcon.js');
let app = express();
const port = 1992;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  let context = {};
  mysql.pool.query("SELECT * FROM workouts", (err, rows, fields) => {
    context.results = JSON.stringify(rows);
    res.render('index', context)
  });
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
      context.results = "Table reset";
      res.render('index', context);
    });
  });
});

app.listen(port, () => console.log(`db-page listening on port ${port}!`));
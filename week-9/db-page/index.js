let express = require('express')
// let mySqlPool = require('dbcon.js');
let app = express();
const port = 1992;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {message: "Hello world!"})
});

app.get('/reset-table', (req, res, next) => {
  let context = {};
  mySqlPool.query("DROP TABLE IF EXISTS workouts", (err) => { //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mySqlPool.query(createString, (err) => {
      context.results = "Table reset";
      res.render('index', context);
    });
  });
});

app.listen(port, () => console.log(`db-page listening on port ${port}!`));
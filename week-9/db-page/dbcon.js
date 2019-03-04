let mysql = require('mysql');
let pool = mysql.createPool({
  host  : 'localhost',
  user  : 'student',
  password: 'default',
  database: 'student'
});

module.exports.pool = pool;

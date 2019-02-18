const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {title: "Pug example", welcomeMessage: "Welcome to the GET and POST checker!"})
});

app.get('/api/v1/_test', (req, res) => {
    res.render('test', {title: "GET Request", message: "GET request received!", params: req.query});
});

app.post('/api/v1/_test', (req, res) => {
    res.render('test', {title: "POST Request", message: "POST request received!"})
})

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
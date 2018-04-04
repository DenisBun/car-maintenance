import mysql from 'mysql';
import express from 'express';
import bodyParser from 'body-parser';
import * as userActions from './src/actions/users/usersActions';

const app = express();
app.use(bodyParser.json());

const con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'car_maintenance'
});

const connection = cb => () => con.connect(err => {
  if (err) throw err;
  cb();
  con.end();
})

app.get('/users', (req, res) => {
  connection(
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.send(result);
    })
  )
});

app.listen(3001);
console.log('Hello there, server is running')

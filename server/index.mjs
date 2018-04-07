import mysql from 'promise-mysql';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const initialConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'car_maintenance'
});

app.post('/users/registration', (req, res) => {
  let connection;
  initialConnection.then(conn => {
    connection = conn;
    return connection.query('SELECT * FROM users')
  }).then(res => {
    const isEmailAvailable = res.some(({ email }) => email === req.body.email);
    if (!isEmailAvailable) return connection.query('INSERT INTO users (email,password) VALUES(?,?)', [req.body.email, req.body.password]);
  }).then(queryResult => {
    return !queryResult
      ? res.status(400).json({ status: 400, registrationMessage: 'Email is already in use'})
      : res.status(200).json({ status: 200, id: queryResult.insertId, role: 1 });
  })
});

app.post('/users/login', (req, res) => {
  let connection;
  initialConnection.then(conn => {
    connection = conn;
    return connection.query('SELECT * FROM users WHERE email=? and password=?', [req.body.email, req.body.password])
  }).then(queryResult => {
    return !queryResult.length
      ? res.status(400).json({ status: 400, errorMessage: 'User not found'})
      : res.status(200).json({ status: 200, id: queryResult[0].id, role: queryResult[0].role });
  })
});




app.listen(3001);
console.log('Hello there, server is running')

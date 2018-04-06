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
    return !isEmailAvailable && connection.query('INSERT INTO users (email,password) VALUES(?,?)', [req.body.email, req.body.password]);
  }).then(queryResult => {
    return !queryResult ? res.status(400).json('Email is already in use') : res.status(200).json(queryResult);
  })
});

app.post('/users/login', (req, res) => {
  console.log(req);
  let connection;
  initialConnection.then(conn => {
    connection = conn;
    return connection.query('SELECT * FROM users WHERE email=? and password=?', [req.body.email, req.body.password])
  }).then(queryResult => {
    return !queryResult.length ? res.status(400).json('User not found') : res.status(200).json(queryResult);
  })
});




app.listen(3001);
console.log('Hello there, server is running')

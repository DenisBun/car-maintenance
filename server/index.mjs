import mysql from 'promise-mysql';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

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




app.listen(3001);
console.log('Hello there, server is running')

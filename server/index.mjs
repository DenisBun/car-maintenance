import mysql from 'promise-mysql';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import moment from 'moment';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const initialConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'car_maintenance',
  multipleStatements: true,
});

app.post('/users/registration', (req, res) => {
  let connection;
  initialConnection
  .then(conn => {
    connection = conn;
    return connection.query('SELECT * FROM users')
  })
  .then(res => {
    const isEmailAvailable = res.some(({ email }) => email === req.body.email);
    if (!isEmailAvailable) return connection.query('INSERT INTO users (email,password) VALUES(?,?)', [req.body.email, req.body.password]);
  })
  .then(queryResult => {
    return !queryResult
      ? res.status(400).json({ status: 400, registrationMessage: 'Email is already in use'})
      : res.status(200).json({ status: 200, id: queryResult.insertId, role: 1 });
  })
});

app.post('/users/login', (req, res) => {
  let connection;
  let userInfo = {}; // write all data, including orders, here
  initialConnection
  .then(conn => {
    connection = conn;
    return connection.query('SELECT * FROM users WHERE email=? and password=?', [req.body.email, req.body.password])
  })
  .then(usersResult => {
    if(usersResult.length) userInfo = {...userInfo, userId: usersResult[0].id, role: usersResult[0].role};
    return !usersResult.length
      ? res.status(400).json({ status: 400, errorMessage: 'User not found'})
      : usersResult
  })
  .then(result => connection.query('SELECT * FROM orders WHERE userId=?', [result[0].id]))
  .then(orders => {
    return orders.length
      ? res.status(200).json({ status: 200, id: orders[0].userId, role: 1, orders })
      : res.status(200).json({ status: 200, id: userInfo.userId, role: userInfo.role, orders: [] })
  })
});


app.get('/users/:id/cars', (req, res) => {
  let connection;
  initialConnection
  .then(conn => {
    connection = conn;
    return connection.query('SELECT * FROM cars WHERE userId=?', [req.params.id])
  })
  .then(queryResult => {
    return res.status(200).json({ status: 200, cars: queryResult });
  })
});

app.post('/users/:id/car', (req, res) => {
  let connection;
  initialConnection
  .then(conn => {
    connection = conn;
    return connection.query('INSERT INTO cars (carName,registrationNumber,userId) VALUES(?,?,?)',
      [req.body.carName, req.body.registrationNumber, req.body.userId])
  })
  .then(queryResult => {
    return res.status(200).json({ status: 200, queryResult });
  })
});

app.get('/maintenance/upgrade', (req, res) => {
  let connection;
  initialConnection
  .then(conn => {
    connection = conn;
    return connection.query('SELECT * FROM maintenances WHERE type=?', ['UPGRADE'])
  })
  .then(queryResult => {
    return res.status(200).json({ status: 200, maintenance: queryResult });
  })
});

app.get('/users/:id/order', (req, res) => {
  let connection;
  initialConnection
  .then(conn => {
    connection = conn;
    return connection.query(`SELECT C.carName, C.registrationNumber, M.title, M.type, M.price, O.status, O.createdAt FROM orders O
      JOIN cars C ON O.carId = C.id
      JOIN maintenances M ON m.id = O.maintenanceId
      WHERE O.userId=?`, [req.params.id])
  })
  .then(queryResult => res.status(200).json(queryResult))
});

app.post('/users/:id/order', (req, res) => {
  let connection;
  initialConnection
  .then(conn => {
    connection = conn;
    return Promise.all (req.body.map(order => {
      connection.query('INSERT INTO orders (userId,carId,maintenanceId,createdAt) VALUES(?,?,?,?)',
        [req.params.id, order.carId, order.maintenanceId,moment(moment.now()).format()])
    }));
  })
  .then(() => res.status(200).json({}))
});

app.listen(3001);
console.log('Hello there, server is running')

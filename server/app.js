const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT;
const jwt_key = process.env.JWT_KEY;

app.use(cors());

app.get('/', (req, res) => {
  //health check route
  res.status(200).send({ code: 0, message: 'ok' });
});

app.get('/token', (req, res) => {
  //route to get a token
  let id = Math.random().toString(36).substring(2, 8);
  let limit = 60 * 3; // 180 seconds
  let expires = Math.floor(Date.now() / 1000) + limit;
  let payload = {
    _id: id,
    exp: expires,
  };
  let token = jwt.sign(payload, jwt_key);
  res.status(201).send({ code: 0, message: 'ok', data: token });
});

app.get('/test', (req, res) => {
  //simulate route that needs a valid token to access
  const header = req.header('Authorization');
  const [type, token] = header.split(' ');
  if (type === 'Bearer' && typeof token !== 'undefined') {
    try {
      let payload = jwt.verify(token, jwt_key);
      let current = Math.floor(Date.now() / 1000);
      let diff = current - payload.exp;
      res.status(200).send({ code: 0, message: `all good. ${diff} remaining` });
    } catch (err) {
      res.status(401).send({ code: 123, message: 'Invalid or expired token.' });
    }
  } else {
    res.status(401).send({ code: 456, message: 'Invalid token' });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log('Bad things', err);
    return;
  }
  console.log('Listening on port', port);
});

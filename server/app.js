const express = require('express');
const app = express();
const cors = require('cors');
const port = 3030;

app.use(cors());

app.get('/', (req, res) => {
  //health check route
  res.status(200).send({ code: 0, message: 'ok' });
});

app.get('/token', (req, res) => {
  //route to get a token
});

app.get('/test', (req, res) => {
  //simulate route that needs a valid token to access
  const header = req.header('Authorization');
});

app.listen(port, (err) => {
  if (err) {
    console.log('Bad things', err);
    return;
  }
  console.log('Listening on port', port);
});

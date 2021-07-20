require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require("morgan");

// Db
require("./db");

// Basic Configuration
const port = process.env.PORT || 4000;

app.use(cors());

// Load third-party middleware
app.use(morgan("dev"));
// Inbuilt middleware for parsing incoming data
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json()); // (for json)
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const Router = require("./modules/routes");
app.use('/api', Router)

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({
    greeting: 'hello API'
  });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
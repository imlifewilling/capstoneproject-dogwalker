const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');



app.use(express.json({limit: '50mb'}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(cors());
// const session = require('express-session');
// app.use(session({ secret: 'thisissecretkey' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res) =>
  res.render(path.join(__dirname, '../static/index.html'), {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  })
);

app.use('/api/auth', require('./api/auth'));
app.use('/api/fetchdata', require('./api/fetchdata'));
app.use('/api/users', require('./api/users'));
app.use('/api/dogs', require('./api/dogs'));

module.exports = app;

const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const cors = require('cors');
const cookieSession = require("cookie-session");
const passportSetup = require ('./passport')

app.use(express.json({limit: '50mb'}));

app.use(cookieSession({
    name: 'session',
    keys: ['dogwalkers'], //need to put into secrets or .env in future
    maxAge: 24*60*60*1000 //max effect time is 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000',
    method: 'GET, POST, PUT, DELETE',
    credentials: true
}))

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../static/index.html')));

app.use('/api/auth', require('./api/auth'));
app.use('/api/fetchdata', require('./api/fetchdata'));

module.exports = app;

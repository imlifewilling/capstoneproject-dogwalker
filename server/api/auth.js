const express = require('express');
const app = express.Router();
const { User } = require('../db');
const { isLoggedIn } = require('./middleware');
const passport = require('passport')

module.exports = app;

const CLIENT_URL = 'http://localhost:3000'

app.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Login failed'
  })
})

app.get('/login/success', async(req, res, next) => {
  try{
    if(req.user){
      const user = await User.findByToken({where: {email: req.user._json.email}})
      console.log(user)
      res.status(200).json({
        success: true,
        message: 'Login success',
        user: req.user,
        // cookies: req.cookies,
        // jwt
      })
    }
  }catch(ex){
    next(ex);
  }
})

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL)
})

//authenticate through google with passport
app.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/google/callback', passport.authenticate(
  'google',
  {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed'
  }
))


//login with email and password
app.post('/', async(req, res, next)=> {//post the credentials to the db to find out the user, if exists, return the token
  try {
    res.send(await User.authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', isLoggedIn, (req, res, next)=> {
  try {
    res.send(req.user);  //send the user to the store
  }
  catch(ex){
    next(ex);
  }
});

app.put('/', isLoggedIn, async(req, res, next)=> {
  try {
    const user = req.user;
    //define the properties a user can change
    await user.update(req.body);
    res.send(user);
  }
  catch(ex){
    next(ex);
  }
});


app.post('/register', async(req, res, next)=> {
  try {
    const user = await User.create(req.body);
    res.send(user.generateToken());
  }
  catch(ex){
    next(ex);
  }
});
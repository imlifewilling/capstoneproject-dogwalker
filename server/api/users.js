const express = require('express');
const app = express.Router();
const { User } = require('../db');
const { isLoggedIn } = require('./middleware');

module.exports = app;

app.use(express.json());

app.get('/', async (req, res, next) => {
    try {
      res.send(await User.findAll());
    } catch (err) {
      next(err);
    }
  });

app.get('/:id', isLoggedIn, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (err) {
    next(err);
  }
});

// app.post('/', async (req, res, next) => {
//   try {
//     res.send(await User.create(req.body));
//   } catch (err) {
//     next(err);
//   }
// });

// app.put('/', isLoggedIn, async (req, res, next) => {
//   try {
//     res.send(await req.user.update(req.body));
//   } catch (err) {
//     next(err);
//   }
// });

// app.put('/:id', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     res.send(await user.update(req.body));
//   } catch (err) {
//     next(err);
//   }
// });


// app.delete('/:id', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     await user.destroy();
//     res.sendStatus(204);
//   } catch (err) {
//     next(err);
//   }
// });

const express = require('express');
const app = express.Router();
const { Dog, User } = require('../db');

module.exports = app;

app.get('/', async (req, res, next) => {
  try {
    const dogs = await Dog.findAll({
      include: [{ model: User }],
      paranoid: false,
    });
    res.send(dogs);
  } catch (ex) {
    next(ex);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const dog = await Dog.findByPk(req.params.id 
    );
    await dog.update(req.body);
    res.send(dog);
  } catch (ex) {
    next(ex);
  }
});

app.post('/', async (req, res, next) => {
  try {
    const dog = await Dog.create(req.body);
    const dogPlus = await Dog.findByPk(dog.id, {
      include: [{ model: User }],
      paranoid: false,
    });
    res.send(dogPlus);
  } catch (ex) {
    next(ex);
  }
});

// app.delete('/:id', async (req, res, next) => {
//   try {
//     const review = await Review.findByPk(req.params.id, { paranoid: false });
//     await review.destroy();
//     res.sendStatus(204);
//   } catch (ex) {
//     next(ex);
//   }
// });

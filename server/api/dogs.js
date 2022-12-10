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

// app.post('/', async (req, res, next) => {
//   try {
//     const review = await Review.create(req.body);
//     const reviewPlus = await Review.findByPk(review.id, {
//       include: [{ model: User }, { model: Book }],
//       paranoid: false,
//     });
//     res.send(reviewPlus);
//   } catch (ex) {
//     next(ex);
//   }
// });

// app.put('/:id', async (req, res, next) => {
//   console.log(req.body);
//   try {
//     console.log('put route', req.body);
//     const review = await Review.findByPk(req.params.id, {
//       include: [{ model: User }, { model: Book }],
//       paranoid: false,
//     });
//     console.log('update', review);
//     await review.update(req.body);

//     res.send(review);
//   } catch (ex) {
//     next(ex);
//   }
// });

// app.delete('/:id', async (req, res, next) => {
//   try {
//     const review = await Review.findByPk(req.params.id, { paranoid: false });
//     await review.destroy();
//     res.sendStatus(204);
//   } catch (ex) {
//     next(ex);
//   }
// });

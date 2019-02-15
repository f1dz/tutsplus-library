var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Genre = require('../models/genre');

router.get('/', (req, res, next) => {
  const genres = Genre.find({}).exec()
    .then(genres => {
      res.render('genres', { genres: genres})
    }, err => {
      throw err
    })
});

router.get('/add', (req, res, next) => {
  res.render('addGenre')
})

router.post('/add', (req, res, next) => {
  req.checkBody('name', 'Name is required').notEmpty()

  const errors = req.validationErrors()

  if(errors) {
    console.log(errors)
    res.render('addgenres', { genre, errors})
  }

  const genre = (new Genre(req.body)).save()
    .then(data => {
      res.redirect('/genres')
    })
    .catch(errors => {
      console.log('oops...');
      console.log(errors);
    })
})
module.exports = router;
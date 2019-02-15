var express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const Book = require('../models/book')
const Genre = require('../models/genre')

router.get('/', (req, res, next) => {
  const books = Book.find({}).exec().then(books => {
    res.render('books', {books: books})
  }, err => {
    throw err
  })
})

router.get('/add', (req, res, next) => {
  const genres = Genre.find({}).exec()
    .then(genres => {
      res.render('addBooks', {genres})
    })
    .catch(err => {
      throw err
    })
})

router.post('/add', (req, res, next) => {
  req.checkBody('name', 'Name is required').notEmpty()
  req.checkBody('description', 'Description is required').notEmpty()
  req.checkBody('genre', 'Genre is required').notEmpty()

  const errors = req.validationErrors()

  const book = (new Book(req.body)).save()
    .then(data => {
      res.redirect('/books')
    })
    .catch(err => {
      console.log('oops...');
    })

    if(errors){
      console.log(errors);
      res.render('addBooks', {book, errors})
    }
})

router.get('/show/:id', (req, res, next) => {
  const book = Book.findOne({_id: req.params.id})
    .populate({
    path: 'genre',
    model: 'Genre',
    populate: {
      path: 'genre',
      model: 'Book'
    }
  })
  .exec()
    .then(book => {
      res.render('book', { book })
    })
    .catch(err => {
      throw err
    })
})

module.exports = router
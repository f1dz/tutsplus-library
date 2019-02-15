const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const bookSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter book name'
  },
  description: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    trim: true
  },
  genre: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre'
  }]
})
module.exports = mongoose.model('Book', bookSchema)
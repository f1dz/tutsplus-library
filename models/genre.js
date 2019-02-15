const mongoose= require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const genreSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a Genre name'
  }
})
module.exports = mongoose.model('Genre', genreSchema)
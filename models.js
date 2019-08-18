var mongoose = require('mongoose')
require('./db')

var Schema = mongoose.Schema;

exports.ShortUrl = mongoose.model('ShortUrl', new Schema({
  original_url:{
    type: String,
    required: true
  }
}, {collection: 'short_urls'}))
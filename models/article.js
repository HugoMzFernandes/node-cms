var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true, index: { unique: true } },
  description: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: false },
  date: { type: Date, default: Date.now }
 });

 module.exports = mongoose.model('articles', ArticleSchema, 'articles')

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const productSchema = new Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  link: String,
  category: String
});

var Products = mongoose.model('Products', productSchema);
module.exports = Products;

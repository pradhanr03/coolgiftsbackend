const Product = require('../models/product');

exports.addProduct = function(req, res, next) {
  const data = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
    link: req.body.link,
    category: req.body.category
  }


  // if (!title) {
  //   return res.status(422).send({ error: 'You must provide all required info'});
  // }

  Product.create(data, function(err, product){
    if(err){
      throw err;
    }
    res.json(product);
  })
}

exports.getProduct = function(req, res, next) {

  Product.find(function(err, product){
    if(err){
      throw err;
    }
    res.json(product)
  })
}

exports.deleteProduct = function(req, res, next) {
  var query = {_id: req.params._id};
  
    Product.remove(query, function(err, product){
      if(err){
        console.log("# API DELETE PRODUCT: ", err);
      }
      res.json(product);
    })
}

exports.updateProduct = function(req, res, next) {
  var product = req.body;
  var query = req.params._id;
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set':{
      title:product.title,
      description:product.description,
      image:product.image,
      price:product.price,
      link:product.link,
      category:product.category
    }
  };
    // When true returns the updated document
    var options = {new: true};

    Product.findOneAndUpdate(query, update, options, function(err, result){
      if(err){
        throw err;
      }
      res.json(result);
    })
}


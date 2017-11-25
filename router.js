const Authentication = require('./controllers/authentication');
const Product = require('./controllers/product_controller');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const config = require('./config');
const {OperationHelper} = require('apac');

var opHelper = new OperationHelper({
  awsId:     config.awsProductAccessId,
  awsSecret: config.awsProductSecret,
  assocId:   config.store,
  locale:    'US'
});

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  app.get('/aws-products', function(req,res) {
    opHelper.execute('ItemSearch', {
      'SearchIndex': 'Shoes',
      'Keywords': 'Gifts for women',
      'ResponseGroup': 'ItemAttributes,Offers, Images, Small,OfferSummary'
    }).then((response) => {
        res.send(response.result);
        // console.log("Raw response body: ", response.responseBody);
    }).catch((err) => {
        console.error("Something went wrong! ", err);
    });
  });

  app.get('/product', Product.getProduct);
  app.post('/add-products', Product.addProduct);
  app.delete('/del-product/:_id', Product.deleteProduct);
  app.put('/product/:_id', Product.updateProduct);
}

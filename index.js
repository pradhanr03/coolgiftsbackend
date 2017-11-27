// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');


// DB Setup
if (process.env.secret) {
  mongoose.connect('mongodb://'+process.env.mongoUser+':'+process.env.mongoPass+'@ds257495.mlab.com:57495/coolgifts');
}
else {
  const config = require('./config');
  mongoose.connect('mongodb://'+config.mongoUser+':'+config.mongoPass+'@ds257495.mlab.com:57495/coolgifts');  
}
// mongoose.connect('mongodb://localhost:auth/auth');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

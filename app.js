var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');
var dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');

var app = express();

dotenv.config();

//DB Configuration
var DB = require('./config/keys');

// DB Connection Start
mongoose.Promise = global.Promise;
mongoose.connect(DB.MongoConnection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('CONNECTION SUCCESSFUL'))
  .catch((err) => console.log(err));
// DB Connection End

// EJS view engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use('./uploads/', express.static('./uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var session  = require('express-session');
var flash    = require('connect-flash');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var expressSanitizer = require('express-sanitizer');


var routes = require('./routes/index');
var users = require('./routes/users');
var getContacts = require('./routes/getContacts')
var login = require('./routes/login')
var signup = require('./routes/signup')



var app = express();
var mime = require('mime')
var crypto = require('crypto');
var sharp = require('sharp')


var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({ storage: storage });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport requirements
require('./config/passport')(passport); // pass passport for configuration
app.use(session({ secret: '085603757172', cookie: { maxAge: 604800000  }, resave: true, saveUninitialized: true })); // maxAge is one week
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/signup', signup)
app.use('/getContacts', getContacts);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

mongoose.connect('mongodb://localhost:27017/avonto')

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;

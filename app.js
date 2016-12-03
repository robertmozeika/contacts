var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require('mongodb')

var routes = require('./routes/index');
var users = require('./routes/users');
var getContacts = require('./routes/getContacts')

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


// app.post('/photos/upload', upload.single('file'), function (req, res, next) {
//   // console.log(req.files)
// console.log(req.body)
//   sharp(req.file.path).resize(200, 200).toBuffer(function (err, buf) {
//     console.log(buf)
//     if (err) return next(err)
//   })
//   sharp(req.file.path)
//   .rotate()
//   .resize(200, 200)
//   .toFile('./public/images/'+ req.body.user + req.body.date +'.jpg', function(err) {
//     // output.jpg is a 300 pixels wide and 200 pixels high image
//     // containing a scaled and cropped version of input.jpg
//   });
//   // .toBuffer()
//
//   // req.files is array of `photos` files
//   // req.body will contain the text fields, if there were any
//   console.log(req.file)
// })
//
//

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
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

var express = require('express');
var router = express.Router();
var getAllContacts = require('../custom_modules/getAllContactsDB.js');
var addContact = require('../custom_modules/addContactDB.js');
var deleteContact = require('../custom_modules/deleteContactDB.js');



/* GET users listing. */
router.get('/all', function(req, res, next) {
  getAllContacts().then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.send(err)
  })
});

router.post('/add', function(req,res,next){
  addContact(req.body).then((data)=>{

    console.log('successfully added contact')
  }).catch((err)=>{
    //change this to a send back to home type signal
    res.send(err)

  })
})


router.get('/delete', function(req, res, next) {
  console.log(req.query.id)
  deleteContact(req.query.id).then((data)=>{
    console.log("successfully deleted contact")
  }).catch((err)=>{
    res.send(err)
  })
});

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


  router.post('/photos/upload', upload.single('file'), function (req, res, next) {
    // console.log(req.files)
  console.log(req.body)
    sharp(req.file.path).resize(200, 200).toBuffer(function (err, buf) {
      console.log(buf)
      if (err) return next(err)
    })
    sharp(req.file.path)
    .rotate()
    .resize(200, 200)
    .toFile('./public/images/'+ req.body.user + req.body.date +'.jpg', function(err) {
      // output.jpg is a 300 pixels wide and 200 pixels high image
      // containing a scaled and cropped version of input.jpg
    });
    // .toBuffer()

    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    console.log(req.file)
  })





// router.get('/delete', function(req,res,next){
//   deleteContact(req.query).then((data)=>{
//     res.redirect('/')
//   }).catch((err)=>{
//     //change this to a send back to home type signal
//     res.send(err)
//
//   })
// })



module.exports = router;

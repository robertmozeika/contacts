var express = require('express');
var router = express.Router();
var getAllContacts = require('../custom_modules/getAllContactsDB.js');
var addContact = require('../custom_modules/addContactDB.js');
var deleteContact = require('../custom_modules/deleteContactDB.js');



/* GET users listing. */
router.get('/all', function(req, res, next) {
  console.log(req.session)
  var user = req.session.passport.user
  getAllContacts(user).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.send(err)
  })
});

router.post('/add', function(req,res,next){
  req.body.firstName = req.sanitize(req.body.firstName);
  req.body.lastName = req.sanitize(req.body.lastName);
  req.body.email = req.sanitize(req.body.email);
  req.body.phone = req.sanitize(req.body.phone )
  req.body.birthday = req.sanitize(req.body.birthday);
  // req.body.groups = req.sanitize(req.body.groups);

  req.body.comments = req.sanitize(req.body.comments);
  req.body.profilePic = req.sanitize(req.body.profilePic);

  for (var i = 0; i < req.body.groups; i++){
    req.body.groups[i] = req.sanitize(req.body.groups[i])
  }


  var postData = req.body;
  postData.user = req.session.passport.user
  addContact(postData).then((data)=>{
    res.send(data)
    console.log('successfully added contact')
  }).catch((err)=>{
    //change this to a send back to home type signal
    console.log(err)
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
var sharp = require('sharp');
var expressSanitizer = require('express-sanitizer')


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
    console.log('tried to upload')
    // console.log(req.files)
  console.log(req.body)
    sharp(req.file.path).resize(200, 200).toBuffer(function (err, buf) {
      console.log(buf)
      if (err) return next(err)
    })
    sharp(req.file.path)
    .rotate()
    .resize(200, 200)
    .toFile('./public/images/'+ req.session.passport.user + req.body.date +'.jpg', function(err) {
      // output.jpg is a 300 pixels wide and 200 pixels high image
      // containing a scaled and cropped version of input.jpg
    });
    // .toBuffer()

    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    console.log(req.file)
  })



  var mongoose = require('mongoose');
  var contactsModel = mongoose.model('contacts',{firstName: String});
  router.get('/testMongoose', function(req, res, next) {
    // mongoose.model('contacts').find({firstName: 'aaa'},function(err, contacts){
    //   res.send(contacts)
    // })

    contactsModel.find()
      .then(function(data, err){
        console.log(err)
        console.log(data)
        res.send(data)
      })
  });

  var Schema = mongoose.Schema;
  var postSchema = new Schema({
    name: String
  }, {collection: 'tester'})

  var testerModel = mongoose.model('tester',postSchema);


  router.get('/postMongoose/:postData', function(req, res, next) {
    // mongoose.model('contacts').find({firstName: 'aaa'},function(err, contacts){
    //   res.send(contacts)
    // })

    var postData = req.params.postData;
    mongoose.Promise = global.Promise;
    // postModel.find()
    //   .then(function(data){
    //     res.send(data)
    //   })

    var input = {name: postData}

    var saveData = new testerModel(input);
    saveData.save()
      testerModel.find()
        .then(function(data){
          res.send(data)
        })
  });




module.exports = router;

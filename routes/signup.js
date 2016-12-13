var express = require('express');
var router = express.Router();
var passport = require('passport')

router.post('/', passport.authenticate('local-signup', {
          successRedirect : '/', // redirect to the home page of contacts
          failureRedirect : '/signup', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
}));


router.get('/', function(req,res,send){
  res.render('signup', {message: req.flash('signupMessage')})
})

// app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
	// 	res.render('login.ejs', { message: req.flash('loginMessage') });
	// });

module.exports = router;

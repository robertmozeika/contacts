var express = require('express');
var router = express.Router();
var passport = require('passport')

router.post('/signup', passport.authenticate('local-signup', {
          successRedirect : '/', // redirect to the home page of contacts
          failureRedirect : '/login', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
}));

router.post('/', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/', function(req,res,send){
  res.render('login', {message: req.flash('loginMessage')})
})


router.get('/logout', function(req,res,send){
  req.session.destroy();
  res.redirect('/login')
})

// app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
	// 	res.render('login.ejs', { message: req.flash('loginMessage') });
	// });

module.exports = router;

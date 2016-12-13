var express = require('express');
var router = express.Router();
var passport = require('passport')

router.post('/signup', passport.authenticate('local-signup', {
          successRedirect : '/',
          failureRedirect : '/login',
          failureFlash : true 
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


module.exports = router;

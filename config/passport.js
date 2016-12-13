var LocalStrategy   = require('passport-local').Strategy;


//model for hasing passwords with username and password scheme under local object
var User  = require('../models/userPass.js');



module.exports = function(passport){


    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    })


    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use('local-signup', new LocalStrategy({
     usernameField : 'username',
     passwordField : 'password',
     passReqToCallback : true
     },
     function(req, username, password, done) {
        console.log('running')
         if (req.body.confirmPassword !== req.body.password){
           return done(null, false, req.flash('signupMessage', 'Passwords do not match'));
         }

         process.nextTick(function() {

         // find a user whose username is the same as the forms username
         // we are checking to see if the user trying to login already exists
         User.findOne({ 'local.username' :  username }, function(err, user) {
                 // if there are any errors, return the error
                 if (err)
                     return done(err);

                 // check to see if theres already a user with that username
                 if (user) {
                     return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                 } else {

                     // if there is no user with that username
                     // create the user
                     var newUser            = new User();

                     // set the user's local credentials
                     newUser.local.username    = username.toLowerCase();
                     newUser.local.password = newUser.generateHash(password);

                     // save the user
                     newUser.save(function(err) {
                         if (err)
                             throw err;
                         return done(null, newUser);
                     });
                 }

             });

             });

           }));


           passport.use('local-login', new LocalStrategy({
             usernameField: 'username',
             passwordField: 'password',
             passReqToCallback: true
           },
           function(req,username,password,done){

             User.findOne({'local.username': username.toLowerCase()},function(err, user){

               if(err){
                return done(err);}

                if(!user){
                  return done(null, false, req.flash('loginMessage','No user found.'))}

                if (!user.validPassword(password)){
                  return done(null, false, req.flash('loginMessage', 'Incorrect Password'))
                }

                return done(null,user)
             })

           }


            ))





}

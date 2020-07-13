const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const User = require("../models/User");

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done)=>{
            User.findOne({email: email})
            .then(user=>{
                if(!user){
                    return done(null, false, { message: "Email not registered" });
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user);
                    } else {
                        return done(null, false, {message: "Incorrect password"});
                    }
                })
            })
            .catch(error => console.log(error))
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}
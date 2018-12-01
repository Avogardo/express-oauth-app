const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log('User profile', profile);
    User.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        // already have this user
        console.log('user is', currentUser);
        done(null, currentUser);
      } else {
        // if not, create user in our db
        new User({
          googleId: profile.id,
          userName: profile.displayName,
          imageUrl: profile.photos[0].value,
        }).save().then((newUser) => {
          console.log('new user created', newUser);
          done(null, newUser);
        });
      }
    });
  }),
);

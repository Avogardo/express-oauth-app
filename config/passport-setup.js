const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log('User profile', profile);
    new User({
      googleId: profile.id,
      userName: profile.displayName,
      imageUrl: profile.photos[0].value,
    }).save().then((newUser) => {
      console.log('new user created', newUser);
    });
  }),
);

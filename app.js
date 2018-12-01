const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/oauth-app', { useNewUrlParser: true }, () => {
  console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(8081, () => {
  console.log('app now listening for requests on port 8081');
});

//bring in dependencies and set up environmental variables
require('dotenv').load();
const PORT = process.env.PORT || 8000;
const express = require('express');
const app = express();
const morgan = require('morgan');
const methodOverride = require('express-method-override');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//set up cookies
const secret = process.env.SECRET_KEY;
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: secret,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// middleware
const isLoggedIn = (req,res,next) => {
  let user = req.session.user;
  if (user) {
    res.locals.currentUser = user; // make currentUser available to all of our views
    next();
  } else {
    res.locals.currentUser = null
    next();
  }
}

// check if user is logged in for every route
app.use(isLoggedIn)

// logging out
app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/')
})

//set up ejs
app.set('view engine', 'ejs');

//home page route
app.get('/', (req, res) => {
  res.send('booyah');
});

// set up morgan
app.use(morgan('dev'));

//bring in other routes
const recipes = require('./routes/recipes');
const users = require('./routes/users');
app.use('/recipes', recipes);
app.use('/users', users);

//port listening
app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;

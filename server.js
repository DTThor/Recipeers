//bring in dependencies and set up environmental variables
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
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['banana', 'kiwi', 'pineapple'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

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

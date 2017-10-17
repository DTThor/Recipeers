//bring in dependencies and set up environmental variables
const PORT = process.env.PORT || 8000;
const express = require('express');
const app = express();
const methodOverride = require('express-method-override');
const bodyParser = require('body-parser');
//set up ejs
app.set('view engine', 'ejs');

//set up static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));




//home page route
app.get('/', (req, res) => {
  res.send('booyah');
});

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
